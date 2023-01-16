import { array, number, object, string } from 'yup';
import type { InferType } from 'yup';

export const pathwayRequestSchema = object({
	title: string().required(),
	contributor: number().required().positive().integer(),
	description: string().required(),
	difficulty: string().required(),
	lessons: array().of<typeof lessonRequestSchema>(
		object()
			.shape({
				name: string().required(),
				content: string().required(),
				quizzes: array().of<typeof quizRequestSchema>(
					object()
						.shape({
							question: string().required(),
							answer: number().required().integer().min(0),
							hint: string(),
							options: array().of<typeof quizOptionRequestSchema>(
								object()
									.shape({
										content: string().required()
									})
									.required()
							)
						})
						.required()
				)
			})
			.required()
	)
});

export const lessonRequestSchema = object({
	name: string().required(),
	content: string().required(),
	quizzes: array().of<typeof quizRequestSchema>(
		object().shape({
			question: string().required(),
			answer: number().required().positive().integer(),
			hint: string().required(),
			options: array().of<typeof quizOptionRequestSchema>(
				object()
					.shape({
						content: string().required()
					})
					.required()
			)
		})
	)
});

export const quizRequestSchema = object({
	question: string().required(),
	answer: number().required(),
	hint: string(),
	options: array().of<typeof quizOptionRequestSchema>(
		object()
			.shape({
				content: string().required()
			})
			.required()
	)
});

const quizOptionRequestSchema = object({
	content: string().required()
});

export type PathwayRequestSchema = InferType<typeof pathwayRequestSchema>;
export type LessonRequestSchema = InferType<typeof lessonRequestSchema>;
export type QuizRequestSchema = InferType<typeof quizRequestSchema>;
export type QuizOptionRequestSchema = InferType<typeof quizOptionRequestSchema>;
