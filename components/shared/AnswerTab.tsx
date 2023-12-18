import React from 'react'

import { AnswerTabProps } from '@/types'
import { getUserAnswers } from '@/lib/actions/user.action'
import { AnswerCard } from '.'

const AnswerTab = async ({ userId, clerkId, searchParams }: AnswerTabProps) => {
  const { answers, totalAnswers } = await getUserAnswers({ userId, page: 1 })

  // console.log(answers)

  return (
    <>
      <div>
        <h1 className='text-dark200_light900' >Total Answers : {totalAnswers}</h1>
      </div>
      {!answers && (
        <div className='text-dark200_light900 text-xl ' >
          This user has not answer any question yet.
        </div>
      )}
      {answers.map(answer => (
        <AnswerCard
          key={answer._id}
          clerkId={clerkId}
          _id={answer._id}
          question={answer.question}
          content={answer.content}
          author={answer.author}
          upvotes={answer.upvotes.length}
          createdAt={answer.createdAt}
        />
      ))}
    </>
  )
}

export default AnswerTab