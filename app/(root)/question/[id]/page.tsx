import { getQuestionById } from '@/lib/actions/question.action'
import React from 'react'

const Question = async ({ searchParams,params }) => {
  const result = await getQuestionById({questionId : params.id})

  console.log(params)
  console.log(result)

  return (
    <div>
      <h1>Question {params.id}</h1>
    </div>
  )
}

export default Question