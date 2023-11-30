"use client"

import React from 'react'
import { usePathname, useRouter } from 'next/navigation'
import millify from 'millify'

import { VotingBarProps } from '@/types'
import { downvoteQuestion, upvoteQuestion } from '@/lib/actions/question.action'

const VotingBar = (props: VotingBarProps) => {
  const router = useRouter()
  const pathname = usePathname()

  const voteHandler = async (action: string) => {
    if (!props.userId) {
      return;
    }

    if (action === 'upvote') {
      if (props.type === 'question') {
        await upvoteQuestion({
          userId: JSON.parse(props.userId),
          questionId: JSON.parse(props.itemId),
          hasUpvoted: props.hasUpvoted,
          hasDownvoted: props.hasDownvoted,
          path: pathname
        })
      } else if (props.type === 'answer') {
        // TODO : Upvote Answer
        // await upvoteAnswer({
        //   userId: JSON.parse(props.userId),
        //   questionId: JSON.parse(props.itemId),
        //   hasUpvoted: props.hasUpvoted,
        //   hasDownvoted: props.hasDownvoted,
        //   path: pathname
        // })
      }
      // TODO : Show Toast
    }

    if (action === 'downvote') {
      if (props.type === 'question') {
        await downvoteQuestion({
          userId: JSON.parse(props.userId),
          questionId: JSON.parse(props.itemId),
          hasUpvoted: props.hasUpvoted,
          hasDownvoted: props.hasDownvoted,
          path: pathname
        })
      } else if (props.type === 'answer') {
        // TODO : Upvote Answer
        // await upvoteAnswer({
        //   userId: JSON.parse(props.userId),
        //   questionId: JSON.parse(props.itemId),
        //   hasUpvoted: props.hasUpvoted,
        //   hasDownvoted: props.hasDownvoted,
        //   path: pathname
        // })
      }
      // TODO : Show Toast
    }
  }

  return (
    <div className="flex gap-5">
      <div className="flex-center gap-2.5">
        <div className="flex-center gap-1.5">
          <img
            src={props.hasUpvoted
              ? '/assets/icons/upvoted.svg'
              : '/assets/icons/upvote.svg'
            }
            width={18}
            height={18}
            alt="upvote"
            className="cursor-pointer"
            onClick={() => voteHandler('upvote')}
          />

          <div className="flex-center background-light700_dark400 min-w-[18px] rounded-sm p-1">
            <p className="subtle-medium text-dark400_light900">
              {millify(props.upvotes)}
            </p>
          </div>
        </div>

        <div className="flex-center gap-1.5">
          <img
            src={props.hasDownvoted
              ? '/assets/icons/downvoted.svg'
              : '/assets/icons/downvote.svg'
            }
            width={18}
            height={18}
            alt="downvote"
            className="cursor-pointer"
            onClick={() => voteHandler('downvote')}
          />

          <div className="flex-center background-light700_dark400 min-w-[18px] rounded-sm p-1">
            <p className="subtle-medium text-dark400_light900">
              {millify(props.downvotes)}
            </p>
          </div>
        </div>
      </div>

      {props.type === 'question' && (
        <img
          src={props.hasSaved
            ? '/assets/icons/star-filled.svg'
            : '/assets/icons/star-red.svg'
          }
          width={18}
          height={18}
          alt="star"
          className="cursor-pointer"
          // TODO : save function action
          onClick={() => { }}
        />
      )}
    </div>
  )
}

export default VotingBar