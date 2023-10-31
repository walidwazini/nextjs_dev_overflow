import * as z from 'zod'

// TODO: problem with aceepting correct validation

export const QuestionSchema = z.object({
  title: z.string(),
  explanation: z.string(),
  tags: z.array(z.string()),
  // title: z.string().min(5).max(130),
  // explanation: z.string().min(1),
  // tags: z.array(z.string().min(1).max(15)).min(1).max(3),
})