"use client"

import React, { useEffect } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import millify from 'millify'

import { VotingBarProps } from '@/types'
import { downvoteQuestion, upvoteQuestion } from '@/lib/actions/question.action'
import { downvoteAnswer, upvoteAnswer } from '@/lib/actions/answer.action'
import { toggleSaveQuestion } from '@/lib/actions/user.action'
import { viewQuestion } from '@/lib/actions/interaction.action'

const VotingBar = (props: VotingBarProps) => {
  const router = useRouter()
  const pathname = usePathname()
  const { itemId, userId, type, downvotes, hasDownvoted, upvotes, hasUpvoted, hasSaved } = props

  const voteHandler = async (action: string) => {
    if (!userId) {
      return;
    }

    if (action === 'upvote') {
      if (type === 'question') {
        await upvoteQuestion({
          userId: JSON.parse(userId),
          questionId: JSON.parse(itemId),
          hasUpvoted: hasUpvoted,
          hasDownvoted: hasDownvoted,
          path: pathname
        })
      } else if (type === 'answer') {
        await upvoteAnswer({
          userId: JSON.parse(userId),
          answerId: JSON.parse(itemId),
          hasUpvoted: hasUpvoted,
          hasDownvoted: hasDownvoted,
          path: pathname
        })
      }
      // TODO : Show Toast
    }

    if (action === 'downvote') {
      if (type === 'question') {
        await downvoteQuestion({
          userId: JSON.parse(userId),
          questionId: JSON.parse(itemId),
          hasUpvoted: hasUpvoted,
          hasDownvoted: hasDownvoted,
          path: pathname
        })
      } else if (type === 'answer') {
        await downvoteAnswer({
          userId: JSON.parse(userId),
          answerId: JSON.parse(itemId),
          hasUpvoted: hasUpvoted,
          hasDownvoted: hasDownvoted,
          path: pathname
        })
      }
      // TODO : Show Toast
    }
  }

  const saveHandler = async () => {
    console.log(userId)
    console.log(JSON.parse(userId))

    await toggleSaveQuestion({
      userId: JSON.parse(userId),
      questionId: JSON.parse(itemId),
      path: pathname
    })
  }

  useEffect(() => {
    viewQuestion({
      questionId: JSON.parse(itemId),
      userId: userId ? JSON.parse(userId) : undefined,
    })
  }, [itemId, userId, pathname, router]);

  return (
    <div className="flex gap-5">
      <div className="flex-center gap-2.5">
        <div className="flex-center gap-1.5">
          <img
            src={hasUpvoted
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
              {millify(upvotes)}
            </p>
          </div>
        </div>

        <div className="flex-center gap-1.5">
          <img
            src={hasDownvoted
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
              {millify(downvotes)}
            </p>
          </div>
        </div>
      </div>

      {type === 'question' && (
        <img
          src={hasSaved
            ? '/assets/icons/star-filled.svg'
            : '/assets/icons/star-red.svg'
          }
          width={18}
          height={18}
          alt="star"
          className="cursor-pointer"
          onClick={() => saveHandler()}
        />
      )}
    </div>
  )
}

export default VotingBar