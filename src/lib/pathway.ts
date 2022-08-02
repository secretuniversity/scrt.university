interface Pathway {
	id: string;
	name: string;
	description: string;
	difficulty: string;
	tags: string[];
	lessons: Lesson[]; // ordered by lesson number
	createdAt: Date;
	updatedAt: Date;
}

interface Lesson {
	id: string;
	name: string;
	file: string; // Markdown file
	question: string;
	answer: string; // markdown safe
}

export type { Pathway, Lesson };
