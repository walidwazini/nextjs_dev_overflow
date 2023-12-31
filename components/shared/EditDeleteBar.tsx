"use client"

import React from 'react'
import { usePathname, useRouter } from 'next/navigation'

import { EditDeleteBarProps } from '@/types'
import { deleteQuestion } from '@/lib/actions/question.action'
import { deleteAnswer } from '@/lib/actions/answer.action'

const EditDeleteBar = ({ type, itemId }: EditDeleteBarProps) => {
  const pathname = usePathname()
  const router = useRouter()

  const handleEdit = () => {
    router.push(`/question/edit/${JSON.parse(itemId)}`)
   }

  const handleDelete = async () => {
    if (type === 'question') {
      await deleteQuestion({ path: pathname, questionId: JSON.parse(itemId) })
    } else if (type === 'answer') {
      await deleteAnswer({ path: pathname, answerId: JSON.parse(itemId) })
    }
  }

  return (
    <div className="flex items-center justify-end gap-3 max-sm:w-full">
      {type === 'question' && (
        <img
          src={'/assets/icons/edit.svg'}
          alt='Edit' width={20} height={20}
          className='cursor-pointer object-contain hover:bg-blue-900 rounded-lg'
          onClick={handleEdit}
        />
      )}
      <img
        src={'/assets/icons/trash.svg'}
        alt='Edit' width={20} height={20}
        className='cursor-pointer object-contain hover:bg-red-900 rounded-lg'
        onClick={handleDelete}
      />
    </div>
  )
}

export default EditDeleteBar