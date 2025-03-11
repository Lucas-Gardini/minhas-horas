export default defineNuxtConfig({
	compatibilityDate: "2024-12-09",

	// (optional) Enable the Nuxt devtools
	devtools: { enabled: false },

	// Enable SSG
	ssr: false,

	// Enables the development server to be discoverable by other devices when running on iOS physical devices
	devServer: { host: process.env.TAURI_DEV_HOST || "localhost" },

	vite: {
		// Better support for Tauri CLI output
		clearScreen: false,
		// Enable environment variables
		// Additional environment variables can be found at
		// https://v2.tauri.app/reference/environment-variables/
		envPrefix: ["VITE_", "TAURI_"],
		server: {
			// Tauri requires a consistent port
			strictPort: true,
		},
	},

	vuetify: {
		vuetifyOptions: {
			theme: {
				defaultTheme: "light",
				themes: {
					light: {
						dark: false,
						colors: {
							primary: "#0fb8e3",
							secondary: "#192440",
						},
					},
					dark: {
						dark: true,
						colors: {
							primary: "#0fb8e3",
							secondary: "#ffffff",
						},
					},
				},
			},
		},
	},

	pinia: {
		storesDirs: ["./stores/**"],
	},

	modules: [
		"vuetify-nuxt-module", // "@nuxt/icon",
		"@pinia/nuxt",
		"pinia-plugin-persistedstate/nuxt",
		"@vueuse/nuxt",
		"@formkit/auto-animate", // "nuxt-lodash",
		"@morev/vue-transitions", //  "@nuxtjs/device",
		"@nuxtjs/tailwindcss",
		"nuxt-viewport",
		"@nuxt/image",
	],

	css: ["@/assets/css/main.scss"],

	app: {
		pageTransition: { name: "page", mode: "out-in" },
	},
});
