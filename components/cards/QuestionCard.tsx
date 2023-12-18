import React from 'react'
import Link from 'next/link'
import { SignedIn } from '@clerk/nextjs'
import moment from 'moment'
import millify from 'millify'

import { QuestionCardProps } from '@/types'
import { Metric, RenderTag } from '../shared'

const QuestionCard = ({ _id, clerkId, title, tags, author, upvotes, views, answers, createdAt }: QuestionCardProps) => {
  // console.log({ clerkId: clerkId, author: author.clerkId })
  // If online user is the author of the question
  const showActionButtons = clerkId && clerkId === author.clerkId

  return (
    <div className="card-wrapper rounded-[10px] p-9 sm:px-11">
      <div className="flex flex-col-reverse items-start justify-between gap-5 sm:flex-row">
        <div>
          <span className="subtle-regular text-dark400_light700 line-clamp-1 flex">
            {moment(createdAt).fromNow()}
          </span>
          <Link href={`/question/${_id}`}>
            <h3 className="sm:h3-semibold base-semibold text-dark200_light900 line-clamp-1 flex-1 hover:underline">
              {title}
            </h3>
          </Link>
        </div>
        <SignedIn>
          {showActionButtons && (
            <div>Action Buttons</div>
          )}
        </SignedIn>
      </div>
      <div className="mt-3.5 flex flex-wrap gap-2">
        {tags.map((tag) => (
          <RenderTag key={tag._id} id={tag._id} name={tag.name} />
        ))}
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
        <Metric
          imgUrl={'/assets/icons/message.svg'}
          alt={'upvotes'}
          title={'Answers'}
          value={answers.length}
          textStyles={`small-medium text-dark400_light800 `}
        />
        <Metric
          imgUrl={'/assets/icons/eye.svg'}
          alt={'view'}
          title={'Views'}
          value={millify(views)}
          textStyles={`small-medium text-dark400_light800 `}
        />
      </div>
    </div>
  )
}

export default QuestionCard