import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit()],
	server: {
		port: process.env.PORT || 4173, // Usa el puerto proporcionado por Render o 4173 como fallback
		host: '0.0.0.0', // Hace que la aplicación esté accesible desde cualquier IP
	},
	build: {
		outDir: 'build', // Especificamos el directorio de salida para la construcción
	},
});
