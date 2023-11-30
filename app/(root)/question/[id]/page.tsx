import Link from 'next/link'
import React from 'react'
import moment from 'moment'
import millify from 'millify'
import { auth } from '@clerk/nextjs'

import { getQuestionById, upvoteQuestion } from '@/lib/actions/question.action'
import { AllAnswers, Metric, ParseHTML, RenderTag, VotingBar } from '@/components/shared'
import AnswerForm from '@/components/forms/AnswerForm'
import { getUserById } from '@/lib/actions/user.action'
import { Button } from '@/components/ui/button'

const Question = async ({ searchParams, params }) => {
  // userId in Clerk database will be used as clerkId in mongoose
  const { userId } = auth()

  let mongoUser

  if (userId) {
    mongoUser = await getUserById({ userId })
  }

  const question = await getQuestionById({ questionId: params.id })

  // console.log(question)

  return (
    <>
      <div className='flex-start w-full flex-col ' >
        <div className='w-full flex flex-col-reverse justify-between gap-5 sm:flex-row sm:items-center sm:gap-2 ' >
          <Link href={'/'} className='flex items-center justify-start gap-1 ' >
            <img
              src={question.author.picture} alt='profile'
              height={22} width={22} className='rounded-full'
            />
            <p className='paragraph-semibold text-dark300_light700 ' >
              {question.author.name}
            </p>
          </Link>
          <div className='flex justify-end' >
            <VotingBar
              type={'question'}
              itemId={JSON.stringify(question._id)}
              userId={JSON.stringify(mongoUser._id)}
              upvotes={question.upvotes.length}
              hasUpvoted={question.upvotes.includes(mongoUser._id)}
              downvotes={question.downvotes.length}
              hasDownvoted={question.downvotes.includes(mongoUser._id)}
              hasSaved={mongoUser?.saved.includes(question._id)}
            />
          </div>
        </div>
        <h2 className='h2-semibold text-dark200_light900 mt-4 w-full text-left ' >
          {question.title}
        </h2>
      </div>

      <div className='mb-8 mt-5 flex flex-wrap gap-4 ' >
        <Metric
          imgUrl={'/assets/icons/clock.svg'}
          alt={'clock icon'}
          value={`asked ${moment(question.createdAt).fromNow()}`}
          title={''}
          // href={`/profile/${author._id}`}
          isAuthor
          textStyles={`body-medium text-dark400_light700 `}
        />
        <Metric
          imgUrl={'/assets/icons/message.svg'}
          alt={'message icon'}
          value={millify(question.answers.length)}
          title={'Answer'}
          // href={`/profile/${author._id}`}
          isAuthor
          textStyles={`body-medium text-dark400_light700 `}
        />
        <Metric
          imgUrl={'/assets/icons/eye.svg'}
          alt={'view'}
          title={'Views'}
          value={millify(question.views)}
          textStyles={`small-medium text-dark400_light800 `}
        />
      </div>
      <ParseHTML data={question.content} />
      <div className='mt-8 flex flex-wrap gap-2 ' >
        {question.tags.map((tag: any) => (
          <RenderTag key={tag._id} id={tag._id} name={tag.name} showCount={false} />
        ))}
      </div>
      <hr className="my-12 h-0.5 border-t-0 dark:bg-slate-600 bg-slate-300 opacity-100 dark:opacity-50" />

      <AllAnswers
        questionId={question._id}
        // userId={JSON.stringify(mongoUser._id)}
        totalAnswers={question.answers.length}
      />

      {userId
        ? (
          <AnswerForm
            question={question.content}
            questionId={JSON.stringify(question._id)}
            authorId={JSON.stringify(mongoUser._id)}
          />
        ) : (
          <div className='text-center mt-10 text-2xl  ' >
            Please log in to answer this question.
          </div>
        )
      }

    </>
  )
}

export default Question