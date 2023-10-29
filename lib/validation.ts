import * as z from 'zod'

export const QuestionSchema = z.object({
  title: z.string().min(5).max(130),
  explanation: z.string().min(100),
  // Minimum 1 array, max 4 array.
  tags: z.array(z.string().min(1).max(15)).min(1).max(4),
})