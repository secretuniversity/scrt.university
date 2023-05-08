// See https://kit.svelte.dev/docs/types#app
/// <reference types="@sveltejs/kit" />

declare namespace App {
	interface Error {
		code: string;
		message: string;
	}
}
