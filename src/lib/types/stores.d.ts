declare namespace Stores {
	interface SecretClient {
		val: import('secretjs').SecretNetworkClient;
		exp: number;
	}

	interface User {
		val: User.Self;
		exp: number;
	}

	interface Contributions {
		val: Contributions.Contribution[];
		exp: number;
	}

	interface Bounties {
		val: Contributions.Bounty.Self[];
		exp: number;
	}

	// interface ContributorStore {
	// 	val: Contributor;
	// 	exp: number;
	// }

	interface Articles {
		val: Contributions.Article.Self[];
		exp: number;
	}

	interface Videos {
		val: Contributions.Video.Self[];
		exp: number;
	}

	interface ResourceTags {
		val: Contributions.Tag[];
		exp: number;
	}

	interface Repos {
		val: Contributions.Repo.Self[];
		exp: number;
	}

	interface Boxes {
		val: Contributions.SecretBox.Self[];
		exp: number;
	}
}
