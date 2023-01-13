export interface User {
	id: number;
	address: string;
	name: Username | null;
}

interface Username {
	String: string;
	Valid: boolean;
}

export interface Contributor {
	id: number;
	address: string;
	name: string;
}

export interface Tag {
	id: number;
	name: string;
}
export interface Article {
	id: number;
	title: string;
	description: string;
	contributor: number;
	content: string;
	created_at: string;
	updated_at: string;
	tags: Array<string>;
}

export interface Bookmark {
	repos: Array<Repo>;
	boxes: Array<SecretBox>;
	pathways: Array<Contributions.Pathway.Self>;
	articles: Array<Article>;
	videos: Array<Video>;
}

export interface Repo {
	id: number;
	title: string;
	description: string;
	github_username: string;
	github_repo: string;
	created_at: string;
	updated_at: string;
	tags: Array<string>;
}

export interface SecretBox {
	id: number;
	title: string;
	description: string;
	contributor: string;
	repo_url: string;
	difficulty: string;
	dev_env: string;
	banner_img: string;
	created_at: string;
	updated_at: string;
	tags: Array<string>;
}

export interface Video {
	id: number;
	title: string;
	description: string;
	contributor: string;
	file: string;
	created_at: string;
	updated_at: string;
	tags: Array<string>;
}

export interface Bounty {
	id: string;
	title: string;
	description: string;
	forum_url: string;
	proposal_url: string | null;
	reward_amount: number;
	status: string;
	created_at: string;
	updated_at: string;
}
