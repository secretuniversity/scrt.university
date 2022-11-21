export interface User {
	id: number;
	address: string;
	name: string | null;
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
	tags: Array<string>;
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

export interface Contributor {
	id: number;
	address: string;
	name: string;
}

// type BountyStatus = 'open' | 'completed' | 'in-progress';

export interface Pathway {
	id: string;
	title: string;
	description: string;
	difficulty: string;
	lessons: Lesson[]; // ordered by lesson number
	createdAt: Date;
	updatedAt: Date;
}

export interface Lesson {
	id: string;
	name: string;
	content: string;
	quizzes: Quiz[];
	pathway_id: number;
}

export interface Quiz {
	id: string;
	question: string;
	answer: number;
	hint: string;
	options: QuizOption[];
	lesson_id: number;
}

export interface QuizOption {
	id: string;
	content: string;
	quiz_id: number;
}

export interface PathwayRequest {
	title: string;
	contributor: number;
	description: string;
	difficulty: string;
	lessons: LessonRequest[];
}

export interface LessonRequest {
	name: string;
	content: string;
	quizzes: QuizRequest[];
}

export interface QuizRequest {
	question: string;
	answer: number;
	hint: string;
	options: QuizOptionRequest[];
}

export interface QuizOptionRequest {
	content: string;
}

export interface ArticleRequest {
	title: string;
	description: string;
	contributor: number;
	content: string;
	tags: string[];
}

interface ContributorVideo extends Repo {
	kind: string;
}

interface ContributorSecretBox extends Repo {
	kind: string;
}

interface ContributorPathway extends Repo {
	kind: string;
}

interface ContributorArticle extends Repo {
	kind: string;
}

export type Contribution =
	| ContributorSecretBox
	| ContributorPathway
	| ContributorArticle
	| ContributorVideo;
export type Resource = Video | Article;
