<div class="container mt-3 mb-5">
    <div class="row justify-content-center">
        <div class="col-md-6">
            <div
                class="contact-section bg-light p-4 rounded"
                style="margin-top: 10%; margin-bottom: 10;"
            >
                <h2>Formulario de Contacto 🐾</h2>
                <p>¡Cuéntanos cómo podemos ayudar a tu amigo peludo!</p>
                <form
                    action="https://formsubmit.co/pettrackerof@gmail.com"
                    method="POST"
                >
                    <label for="name" class="form-label"
                        ><i class=""></i> Nombre y Apellido</label
                    >
                    <div class="form-group">
                        <input
                            type="text"
                            class="form-control"
                            required
                            placeholder="Nombre y apellido"
                            name="name"
                        />
                    </div>
                    <div class="form-group">
                        <label for="email" class="form-label"
                            ><i class=""></i> Correo electrónico</label
                        >
                        <i class=""></i>
                        <input
                            type="email"
                            class="form-control"
                            required
                            placeholder="Correo electrónico"
                            name="email"
                        />
                    </div>
                    <div class="form-group">
                        <label for="message" class="form-label"
                            ><i class="fa-solid fa-pen-to-square"></i> Tu mensaje</label
                        >
                        <i class="fa-solid fa-pen-to-square"></i>
                        <textarea
                            type="text"
                            cols="30"
                            class="form-control"
                            rows="10"
                            placeholder="Escribe tu mensaje"
                            name="message"
                        ></textarea>
                    </div>
                    <div class="submit-container text-center">
                        <button type="submit" class="btn btn-primary"
                            >🐶 Enviar mensaje 🐱</button
                        >
                    </div>
                    <input type="hidden" name="_next" value="/" />
                    <input type="hidden" name="_captcha" value="true" />
                    <input type="hidden" name="_formsubmit_id" value="form" />
                    <!-- Agregamos el atributo "value" -->
                </form>
                <!-- Move this line here -->
            </div>
        </div>
    </div>
</div>

<style>
    .contact-section h2 {
        font-family: "Comic Sans MS", sans-serif;
        font-size: 2rem;
        font-weight: bold;
        color: #006aff;
        text-align: center;
    }

    .contact-section p {
        text-align: center;
        font-size: 1rem;
        color: #333;
    }

    .form-group {
        margin-bottom: 15px;
    }

    .form-control {
        width: 100%;
        border-radius: 10px;
        padding: 15px;
        border: 2px solid #ddd;
        font-size: 16px;
    }

    .form-control:focus {
        border-color: #006aff;
        box-shadow: #006aff;
    }

    .form-label {
        font-weight: bold;
        font-size: 1rem;
    }

    button {
        width: 100%;
        background-color: #000000;
        border: none;
        border-radius: 50px;
        font-size: 1.2rem;
        font-weight: bold;
        padding: 15px;
        cursor: pointer;
        transition: background-color 0.3s;
    }

    button:hover {
        background-color: #006aff;
    }

    @media (max-width: 767px) {
        .contact-section {
            margin-top: 5%;
        }
    }
</style>
