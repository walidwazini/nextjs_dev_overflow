import React from 'react'

import { getUserQuestions } from '@/lib/actions/user.action'
import { QuestionTabProps } from '@/types'


const QuestionTab = async ({ searchParams, userId, clerkId }: QuestionTabProps) => {
  const result = await getUserQuestions({ userId, page: 1 })

  console.log(result)

  return (
    <div>QuestionTab</div>
  )
}

export default QuestionTab