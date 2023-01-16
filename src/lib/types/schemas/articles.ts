import { array, number, object, string } from 'yup';
import type { InferType } from 'yup';

export const articleRequestSchema = object({
	title: string().required(),
	description: string().required(),
	contributor: number().required().positive().integer(),
	content: string().required(),
	tags: array().of(string().required())
});

export type ArticleRequestSchema = InferType<typeof articleRequestSchema>;
