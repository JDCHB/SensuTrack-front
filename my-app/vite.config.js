/*import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit()],
	server: {
		port: process.env.PORT || 4173, // Usa el puerto proporcionado por Render o 4173 como fallback
		host: '0.0.0.0', // Hace que la aplicación esté accesible desde cualquier IP
	},
	preview: {
		allowedHosts: ['sensutrack-front.onrender.com'], // Agrega tu dominio aquí
	},
	build: {
		outDir: 'build', // Especificamos el directorio de salida para la construcción
	},
});
*/
// import { sveltekit } from '@sveltejs/kit/vite';
// import { defineConfig } from 'vite';

// export default defineConfig({
// 	plugins: [sveltekit()]
// });

import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit()],
	server: {
		host: '0.0.0.0', // Escucha en todas las interfaces de red
		port: process.env.PORT || 4173, // Usa el puerto asignado por Render o el puerto 4173 por defecto
	},
});