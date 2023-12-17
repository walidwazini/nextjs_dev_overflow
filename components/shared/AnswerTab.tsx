import React from 'react'

import { AnswerTabProps } from '@/types'
import { getUserAnswers } from '@/lib/actions/user.action'

const AnswerTab = async ({ userId, clerkId, searchParams }: AnswerTabProps) => {
  const { answers, totalAnswers } = await getUserAnswers({ userId, page: 1 })

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
          key={answer._id} _id={answer._id}
          title={answer.title} author={answer.author}
          answers={answer.answers} createdAt={answer.createdAt}
          tags={answer.tags} upvotes={answer.upvotes.length} views={answer.views}
        />
      ))}
    </>
  )
}

export default AnswerTab