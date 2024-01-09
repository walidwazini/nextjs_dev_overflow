import React from 'react'
import Link from 'next/link'

import { RenderTag } from '.'
import { getHotQuestions } from '@/lib/actions/question.action'
import { getPopularTags } from '@/lib/actions/tag.actions'

const RightSidebar = async () => {
  const hotQuestions = await getHotQuestions()
  const popularTags = await getPopularTags()


  return (
    <section
      className={`background-light900_dark200 light-border sticky right-0 top-0 h-screen
    flex flex-col overflow-y-auto border-l p-6 pt-36 shadow-light-300 dark:shadow-none
    max-xl:hidden w-[350px] custom-scrollbar `}
    >
      <div
      >
        <h3 className='h3-bold text-dark200_light900 ' >Top Questions</h3>
        <div className='mt-7 w-full flex flex-col gap-[30px] ' >
          {hotQuestions.map(item => (
            <Link
              href={`/question/${item._id}`} key={item._id}
              className='flex cursor-pointer items-center justify-between gap-7 '
            >
              <p className='body-medium text-dark500_light700 line-clamp-1 hover:underline' >{item.title}</p>
              <img src={'/assets/icons/chevron-right.svg'} alt='icon' width={20} height={20} className='invert-colors' />
            </Link>
          ))}
        </div>
      </div>
      <div className='mt-16' >
        <h3 className='h3-bold text-dark200_light900 ' >Popular Tags</h3>
        <div className='mt-7 flex flex-col gap-4 ' >
          {popularTags.map(tag => (
              <RenderTag 
              key={tag._id} id={tag._id} name={tag.name}
              totalQuestion={tag.numOfQuestions} showCount
              />
            ))}
        </div>
      </div>
    </section>
  )
}

export default RightSidebar