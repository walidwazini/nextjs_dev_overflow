import moment from 'moment'
import React from 'react'
import Link from 'next/link'


import { AnswerCardProps, QuestionCardProps } from '@/types'
import { Metric } from '../shared'
import millify from 'millify'

const AnswerCard = ({ _id, clerkId, content, author, upvotes, createdAt, question }: AnswerCardProps) => {
  return (
    <Link href={`/question/${question._id}/#${_id}`} className="card-wrapper rounded-[10px] p-9 sm:px-11">
      <div className="flex items-start justify-between gap-5 ">
        <h3 className="italic font-semibold text-dark200_light900 line-clamp-1 flex-1">
          {question.title}
        </h3>
        <h3 className='italic text-sm ' >
          {moment(question.createdAt).fromNow()}
        </h3>
      </div>
      <hr className="my-4 h-0.5 border-t-0 dark:bg-slate-600 bg-slate-300 opacity-100 dark:opacity-50" />
      <div>
        <div className="mb-2 text-md font-semibold text-dark400_light700 line-clamp-1 flex">
          Answered &mdash; {moment(createdAt).fromNow()}
        </div>
        <div style={{
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
          maxHeight: '200px', // Adjust the maximum width as needed
        }} dangerouslySetInnerHTML={{ __html: content }} />
      </div>
      <div className="flex-between mt-6 w-full flex-wrap gap-3">
        <Metric
          imgUrl={'/assets/icons/avatar.svg'}
          alt={'author'}
          value={author.name}
          title={` - ${moment(createdAt).fromNow()}`}
          href={`/profile/${author._id}`}
          isAuthor
          textStyles={`body-medium text-dark400_light700 `}
        />
        <Metric
          imgUrl={'/assets/icons/like.svg'}
          alt={'upvotes'}
          title={'Votes'}
          value={millify(upvotes)}
          textStyles={`small-medium text-dark400_light800 `}
        />
      </div>
    </Link>
  )
}

export default AnswerCard