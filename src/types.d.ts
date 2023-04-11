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

declare namespace Page {
	interface Base {
		title: string;
		description: string;
	}

	interface Bounties extends Base {
		communityBounties: Contributions.Bounty.Community[];
		slabsBounties: Contributions.Bounty.Slabs[];
	}

	interface Resources extends Base {
		resources: {
			articles: Contributions.Article.Self[];
			videos: Contributions.Video.Self[];
		};
	}

	interface Repositories extends Base {
		repos: Contributions.Repo.Self[];
		secretBoxes: Contributions.SecretBox.Self[];
	}

	interface Pathways extends Base {
		pathways: Contributions.Pathway.Self[];
	}

	interface Article extends Base {
		article: Contributions.Article.Self;
	}

	interface Video extends Base {
		video: Contributions.Video.Self;
	}

	interface Pathway extends Base {
		pathway: Contributions.Pathway.Self;
	}

	interface SecretBox extends Base {
		box: Contributions.SecretBox.Self;
	}
}

interface Note {
	id: number;
	message: string;
	status: 'success' | 'error' | 'info';
	loading: boolean;
	close: boolean;
}

type FetchFn = (input: RequestInfo | URL, init?: RequestInit | undefined) => Promise<Response>;
