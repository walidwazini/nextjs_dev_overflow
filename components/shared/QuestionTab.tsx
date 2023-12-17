import React from 'react'

import { getUserQuestions } from '@/lib/actions/user.action'
import { QuestionTabProps } from '@/types'
import { QuestionCard } from '.'


const QuestionTab = async ({ searchParams, userId, clerkId }: QuestionTabProps) => {
  const { questions, totalQuestions } = await getUserQuestions({ userId, page: 1 })

  // console.log(result)

  return (
    <>
      <div>
        <h1 className='text-dark200_light900' >Total Questions : {totalQuestions}</h1>
      </div>
      {!questions && (
        <div className='text-dark200_light900 text-xl ' >
          This user has not post any questions yet.
        </div>
      )}
      {questions.map(question => (
        <QuestionCard
          key={question._id} _id={question._id}
          title={question.title} author={question.author}
          answers={question.answers} createdAt={question.createdAt}
          tags={question.tags} upvotes={question.upvotes.length} views={question.views}
        />
      ))}
    </>
  )
}

export default QuestionTab