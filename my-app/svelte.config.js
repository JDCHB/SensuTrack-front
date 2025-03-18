// import adapter from '@sveltejs/adapter-auto';

// /** @type {import('@sveltejs/kit').Config} */
// const config = {
// 	kit: {
// 		// adapter-auto only supports some environments, see https://svelte.dev/docs/kit/adapter-auto for a list.
// 		// If your environment is not supported, or you settled on a specific environment, switch out the adapter.
// 		// See https://svelte.dev/docs/kit/adapters for more information about adapters.
// 		adapter: adapter()
// 	}
// };

// export default config;

/*import adapter from '@sveltejs/adapter-auto';

/** @type {import('@sveltejs/kit').Config} */
/**const config = {
	kit: {
		// adapter-auto only supports some environments, see https://svelte.dev/docs/kit/adapter-auto for a list.
		// If your environment is not supported, or you settled on a specific environment, switch out the adapter.
		// See https://svelte.dev/docs/kit/adapters for more information about adapters.
		adapter: adapter()
	}
};

export default config;
*/
// import adapter from '@sveltejs/adapter-node';

// export default {
// 	kit: {
// 		// other config options
// 		adapter: adapter(),  // Agrega el adaptador para Node.js
// 	}
// };

import adapter from '@sveltejs/adapter-node';

export default {
	kit: {
		adapter: adapter({
			out: 'build',
			precompress: false,
			env: {
				port: 'PORT', // Render automáticamente asigna un puerto a la variable de entorno PORT
				host: 'HOST', // Puedes usar '0.0.0.0' para escuchar en todas las interfaces de red
			}
		}),
	}
};