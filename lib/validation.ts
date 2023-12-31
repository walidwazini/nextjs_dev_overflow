import * as z from 'zod'

export const QuestionSchema = z.object({
  // title: z.string(),
  // explanation: z.string(),
  // tags: z.array(z.string()),
  title: z.string().min(5).max(130),
  explanation: z.string().min(50),
  tags: z.array(z.string().min(1).max(15)).min(1).max(3),
})

export const AnswerSchema = z.object({
  answer: z.string().min(10)
})

export const ProfileSchema = z.object({
  name: z.string().min(5).max(50),
  username: z.string().min(5).max(50),
  // Optional make it unrequired...
  bio: z.string().min(10).max(150).optional(),
  portfolioWebsite: z.string().url().optional(),
  location: z.string().min(5).max(50).optional(),
})