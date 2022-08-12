export type Bounty = {
	id: string;
	title: string;
	description: string;
	forumPost: string;
	proposal: string | null;
	amount: number;
	status: BountyStatus;
	createdAt: string; // ISO 8601 date string
	updatedAt: string; // ISO 8601 date string
};

type BountyStatus = 'open' | 'completed' | 'in-progress';
