"use client"

import React from 'react'
import millify from 'millify'

import { VotingBarProps } from '@/types'

const VotingBar = (props: VotingBarProps) => {

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
            onClick={() => { }}
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
            onClick={() => { }}
          />

          <div className="flex-center background-light700_dark400 min-w-[18px] rounded-sm p-1">
            <p className="subtle-medium text-dark400_light900">
              {millify(props.downvotes)}
            </p>
          </div>
        </div>
      </div>

      {props.type === 'Question' && (
        <img
          src={props.hasSaved
            ? '/assets/icons/star-filled.svg'
            : '/assets/icons/star-red.svg'
          }
          width={18}
          height={18}
          alt="star"
          className="cursor-pointer"
          onClick={() => { }}
        />
      )}
    </div>
  )
}

export default VotingBar