"use client"

import React from 'react'

import { EditDeleteBarProps } from '@/types'
import { deleteQuestion } from '@/lib/actions/question.action'
import path from 'path'

const EditDeleteBar = ({ type, itemId }: EditDeleteBarProps) => {

  const handleEdit = () => { }

  const handleDelete = () => {
    if (type === 'question') {

    } else if (type === 'answer') {

    }
  }

  return (
    <div className="flex items-center justify-end gap-3 max-sm:w-full">
      {type === 'question' && (
        <img
          src={'/assets/icons/edit.svg'}
          alt='Edit' width={20} height={20}
          className='cursor-pointer object-contain'
          onClick={handleEdit}
        />
      )}
      <img
        src={'/assets/icons/trash.svg'}
        alt='Edit' width={20} height={20}
        className='cursor-pointer object-contain'
        onClick={handleDelete}
      />
    </div>
  )
}

export default EditDeleteBar