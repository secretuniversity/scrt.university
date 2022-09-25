export interface User {
	id: number;
	address: string;
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
	tags: Array<Tag>;
}

export interface Bookmark {
	repos: Array<Repo>;
	boxes: Array<SecretBox>;
	pathways: Array<Pathway>;
	articles: Array<Article>;
	videos: Array<Video>;
}

export interface Repo {
	id: number;
	title: string;
	description: string;
	github_username: string;
	url: string;
	created_at: string;
	updated_at: string;
	tags: Array<Tag>;
}

export interface SecretBox {
	id: number;
	title: string;
	description: string;
	contributor: string;
	url: string;
	difficulty: string;
	dev_env: string;
	banner_img: string;
	created_at: string;
	updated_at: string;
	tags: Array<Tag>;
}

export interface Video {
	id: number;
	title: string;
	description: string;
	contributor: string;
	file: string;
	created_at: string;
	updated_at: string;
	// tags: Array<Tag>
}

export interface Bounty {
	id: string;
	title: string;
	description: string;
	forum_url: string;
	proposal_url: string | null;
	amount: number;
	status: string;
	created_at: string;
	updated_at: string;
}

export interface Contributor {
	id: number;
	address: string;
	name: string;
}

// type BountyStatus = 'open' | 'completed' | 'in-progress';

export interface Pathway {
	id: string;
	name: string;
	description: string;
	difficulty: string;
	tags: string[];
	lessons: Lesson[]; // ordered by lesson number
	createdAt: Date;
	updatedAt: Date;
}

export interface Lesson {
	id: string;
	name: string;
	content: string;
	pathway_id: number;
}

export interface Quiz {
	id: string;
	question: string;
	answer: string;
	hint: string;
	lesson_id: number;
}

export interface QuizOption {
	id: string;
	content: string;
	quiz_id: number;
}

export type Contribution = Repo | SecretBox | Pathway | Video | Article;
