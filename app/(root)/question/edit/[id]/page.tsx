import React from 'react'

import Question from '@/components/forms/Question'
import { auth } from '@clerk/nextjs'
import { getUserById } from '@/lib/actions/user.action'
import { getQuestionById } from '@/lib/actions/question.action'

const EditQuestionPage = async ({ params }: { params: { id: string } }) => {
  const { userId } = auth()

  if (!userId) return null

  const mongoUser = await getUserById({ userId })
  const result = await getQuestionById({ questionId: params.id })

  return (
    <>
      <h1 className='h1-bold text-dark100_light900' >Edit Question</h1>
      <div className='mt-9' >
        <Question
          type='edit'
          mongoUserId={mongoUser._id}
          questionDetails={JSON.stringify(result)}
        />
      </div>
    </>
  )
}

export default EditQuestionPage