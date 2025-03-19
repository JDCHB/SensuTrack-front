import { redirect, json } from '@sveltejs/kit';
import { OAuth2Client } from 'google-auth-library';
import { SECRET_CLIENT_ID, SECRET_CLIENT_SECRET } from '$env/static/private';
import { onMount } from "svelte";

let error = null;


async function getUserData(access_token) {

    const response = await fetch(`https://www.googleapis.com/oauth2/v3/userinfo?access_token=${access_token}`);
    console.log('response', response);
    const data = await response.json();
    console.log('data:-------------------------------------------------------', data);
    return data;
}


async function verificarUsuarioEnBD(user) {

    console.log("SI ENTRAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA AL Verificar_Google_User")
    console.log("user tiene", user)
    const res = await fetch("https://proyectomascotas.onrender.com/Verificar_Google_User", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            // google_id: "108073988978568365707",
            // foto: "https://lh3.googleusercontent.com/a/ACg8ocLJAwrGIdkk_oEG0r4o3uDoMICJ0VYzt7-wfK7Dos6cWvEEtPg=s96-c",
            // access_token: "ya29.a0AeXRPp4yG2S0En0Qwh_o_rVC04beHP7mwkLPk7hcFSeLZinkxole5nwHIm78Is_crUjuCUc3IRqn2rmMqCTAPSL-YqOHy5urEWqmcs8nojgu8yis9dHAB15P-E-kqNzqWEgV6DCezS6dO8d7nFjVh3bOwEp4O6C0Hj7ztXVDaCgYKARASARMSFQHGX2MiBBkbB7Mj-2Tw-buUapip_Q0175",
            // estado: true,
            // email: "juan.charris2110@gmail.com",
            // nombre: "Juan",
            // apellido: "Charris",
            google_id: user.sub,
            foto: user.foto,
            access_token: user.access_token,
            estado: true,
            email: user.email,
            nombre: user.given_name,
            apellido: user.family_name,
        })
    });
    console.log("Datos enviados al backend:", {
        google_id: user.sub,
        foto: user.picture,
        access_token: r.tokens.access_token,
        estado: true,
        email: user.email,
        nombre: user.given_name,
        apellido: user.family_name,
    });
    return await res.json();
}


var rol_v = 0
let estado_v = 0
let v_estado = 0
export const GET = async ({ url, cookies }) => {
    const redirectURL = 'https://sensutrack-front.onrender.com/oauth';
    const code = await url.searchParams.get('code');

    //console.log('returned state',state)
    console.log('returned code', code)

    try {
        const oAuth2Client = new OAuth2Client(
            SECRET_CLIENT_ID,
            SECRET_CLIENT_SECRET,
            redirectURL
        );
        const r = await oAuth2Client.getToken(code);
        // Make sure to set the credentials on the OAuth2 client.
        oAuth2Client.setCredentials(r.tokens);
        console.info('Tokens acquired.');
        //const user = oAuth2Client.credentials;
        const user = await getUserData(r.tokens.access_token);
        console.log('credentials', user);

        //await getUserData(user.access_token);
        console.log('Verifying user in DB:', user);
        const usuarioBD = await verificarUsuarioEnBD({
            google_id: user.sub,  // ID único de Google
            foto: user.picture,
            access_token: r.tokens.access_token,
            estado: true,
            email: user.email,
            nombre: user.given_name,
            apellido: user.family_name
        });
        console.log('User from DB:', usuarioBD);
        let v_google_id = user.sub;
        let v_nombre = user.name;
        let v_email = user.email;
        let v_foto = user.foto;
        let access_token = r.tokens.access_token

        console.log("Respuesta del backend:", usuarioBD);
        let v_id = usuarioBD.id ? usuarioBD.id : 1;
        rol_v = usuarioBD.rol_v ? usuarioBD.rol_v : 1;
        v_estado = usuarioBD.estado ? usuarioBD.estado : false;


        estado_v = usuarioBD.Informacion;
        console.log("sesionGoogle ESTA ES LA ENTRADAAAAAAAA ANTES DE TODOOOOOOOOOOOO")
        cookies.set('sesionGoogle', JSON.stringify({
            google_id: user.sub,
            nombre: user.given_name,
            apellido: user.family_name,
            email: user.email,
            foto: user.picture,
            access_token: r.tokens.access_token,
            estado: estado_v,
            id: v_id,
            rol_v: rol_v
        }), {
            path: '/',
            httpOnly: false,
            secure: true,
            sameSite: "None",
            maxAge: 60 * 60 * 24 * 7 // 1 semana
        });
        console.log("sesionGoogle AQUI YA PASOOOOOOOOOOOOOOO")

        error = null




    } catch (err) {
        console.log('Error logging in with OAuth2 user', err);
        error = err
        throw redirect(303, '/login');

    }
    finally {

        if (error) {

            throw redirect(303, '/login');

        }

        if (estado_v === "Ya_existe" && v_estado != false) {
            if (rol_v == 1) {
                throw redirect(303, '/Can_See_Or_Not');
            }
            else if (rol_v == 2) {
                throw redirect(303, '/usuario');
            }
            else if (rol_v == 3) {
                throw redirect(303, '/administrador');
            }
            else {
                throw redirect(303, '/');
            }
        } else if (estado_v === "Registrada") {
            console.log("Estado actual:", estado_v, "Rol:", rol_v);

            throw redirect(303, '/formulario_completar');
        } else if (estado_v === "Ya_existe" && v_estado == false) {

            throw redirect(303, '/formulario_completar');
        }
    }
    throw redirect(303, '/usuario');

};