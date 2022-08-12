export type Bounty = {
	id: string;
	title: string;
	description: string;
	forumPost: string;
	proposal: string;
	amount: number;
	status: BountyStatus;
	createdAt: Date;
	updatedAt: Date;
};

export type BountyStatus = 'open' | 'completed' | 'in-progress';
