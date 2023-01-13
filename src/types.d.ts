declare namespace svelte.JSX {
	interface HTMLAttributes<T> {
		onclick_outside: () => void;
	}
}

interface PageData {
	title: string;
	description: string;
}

declare namespace User {
	interface Self {
		id: string;
		address: string;
		name: Username | null;
	}

	interface Username {
		String: string;
		Valid: boolean;
	}
}
