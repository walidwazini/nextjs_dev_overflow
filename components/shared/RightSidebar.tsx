"use client"

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { RenderTag } from '.'

const sampleHotQuestions = [
  { _id: 1, question: 'How do I use prisma in Nextjs 13 ?' },
  { _id: 2, question: 'How do I use prisma in Nextjs 13 ?' },
  { _id: 3, question: 'How do I use prisma in Nextjs 13 ?' },
  { _id: 4, question: 'How do I use prisma in Nextjs 13 ?' },
]

const popularTags = [
  { _id: 1, name: 'Typescript', totalQuestion: 12 },
  { _id: 2, name: 'Nextjs', totalQuestion: 14 },
  { _id: 3, name: 'Reactjs', totalQuestion: 22 },
  { _id: 4, name: 'Laravel', totalQuestion: 31 },
  { _id: 5, name: 'Angular', totalQuestion: 17 },
]

// TODO try make the Image tag size as dynamic

// TODO finalize render tag

const RightSidebar = () => {


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
          {sampleHotQuestions.map(item => (
            <Link
              href={`/questions/${item._id}`} key={item._id}
              className='flex cursor-pointer items-center justify-between gap-7 '
            >
              <p className='body-medium text-dark500_light700 ' >{item.question}</p>
              <Image src={'/assets/icons/chevron-right.svg'} alt='icon' width={20} height={20} className='invert-colors' />
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
              totalQuestion={tag.totalQuestion} showCount
              />
            ))}
        </div>
      </div>
    </section>
  )
}

export default RightSidebar