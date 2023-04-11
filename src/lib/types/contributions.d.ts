declare type PathwayRequestSchema = import('./schemas/pathways').PathwayRequestSchema;
declare type LessonRequestSchema = import('./schemas/pathways').LessonRequestSchema;
declare type QuizRequestSchema = import('./schemas/pathways').QuizRequestSchema;
declare type QuizOptionRequestSchema = import('./schemas/pathways').QuizOptionRequestSchema;
declare type ArticleRequestSchema = import('./schemas/articles').ArticleRequestSchema;

declare namespace Contributions {
	declare type UserContribution = Article.Self | Video.Self | SecretBox.Self | Pathway.Self;

	interface Tag {
		id: string;
		name: string;
	}

	declare namespace Pathway {
		interface Self {
			kind: 'pathway';
			id: string;
			contributor: number;
			title: string;
			description: string;
			difficulty: string;
			lessons: Lesson[]; // ordered by lesson number
			createdAt: Date;
			updatedAt: Date;
		}

		interface Lesson {
			id: string;
			name: string;
			content: string;
			quizzes: Quiz[];
			pathway_id: number;
			kind: 'lesson';
		}

		interface Quiz {
			id: string;
			question: string;
			answer: number;
			hint: string;
			options: QuizOption[];
			lesson_id: number;
			kind: 'quiz';
		}

		interface QuizOption {
			id: string;
			content: string;
			quiz_id: number;
		}
		interface PathwayRequest extends PathwayRequestSchema {
			title: string;
			contributor: number;
			description: string;
			difficulty: string;
			lessons: LessonRequest[];
		}

		interface LessonRequest extends LessonRequestSchema {
			name: string;
			content: string;
			quizzes: QuizRequest[];
		}

		interface QuizRequest extends QuizRequestSchema {
			question: string;
			answer: number;
			hint: string;
			options: QuizOptionRequest[];
		}

		interface QuizOptionRequest extends QuizOptionRequestSchema {
			content: string;
		}
	}

	declare namespace Article {
		interface Self {
			kind: 'article';
			id: string;
			title: string;
			contributor: number;
			description: string;
			content: string;
			tags: string[];
			external_url: {
				String: string;
				Valid: boolean;
			};

			createdAt: Date;
			updatedAt: Date;
		}

		interface ArticleRequest extends ArticleRequestSchema {
			title: string;
			contributor: number;
			description: string;
			content: string;
			external_url: string;
			tags: string[];
		}
	}

	declare namespace Bounty {
		interface Community {
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

		interface Slabs {
			id: number;
			category: string;
			title: string;
			complexity: string;
			status: string;
			reward: number;
			token: string;
			description: string;
			success_criteria: string;
			external_url: string;
		}
	}

	declare namespace SecretBox {
		interface Self {
			kind: 'secret-box';
			id: number;
			title: string;
			description: string;
			contributor: number;
			repo_url: string;
			difficulty: string;
			dev_env: string;
			banner_img: string;
			created_at: string;
			updated_at: string;
			tags: string[];
		}
	}

	declare namespace Repo {
		interface Self {
			id: number;
			title: string;
			description: string;
			github_username: string;
			github_repo: string;
			created_at: string;
			updated_at: string;
			tags: string[];
		}
	}

	declare namespace Video {
		interface Self {
			kind: 'video';
			id: number;
			contributor: number;
			title: string;
			description: string;
			external_url: {
				String: string;
				Valid: boolean;
			};
			youtube_url: string;
			created_at: string;
			updated_at: string;
			tags: string[];
		}
	}

	// declare namespace Bookmark {
	// 	interface Self {

	// 	}
	// }
}
