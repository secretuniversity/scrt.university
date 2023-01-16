declare namespace svelte.JSX {
	interface HTMLAttributes<T> {
		onclick_outside: () => void;
	}
}

declare namespace User {
	interface Self {
		id: number;
		address: string;
		name: Username | null;
	}

	interface Username {
		String: string;
		Valid: boolean;
	}
}

interface PageData {
	title: string;
	description: string;
}

interface Note {
	id: number;
	message: string;
	status: 'success' | 'error' | 'info';
	loading: boolean;
	close: boolean;
}

type FetchFn = (input: RequestInfo | URL, init?: RequestInit | undefined) => Promise<Response>;
