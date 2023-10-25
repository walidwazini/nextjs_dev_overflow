"use client"

import React from 'react'

import { CustomInputProps } from '@/types'
import Image from 'next/image'
import { Input } from '@/components/ui/input'

const LocalSearchbar = ({ route, iconPosition, imgSrc, placeholder, otherClasses }: CustomInputProps) => {
  return (
    <div
      className={`background-light800_darkgradient flex min-h-[56px] 
      grow items-center gap-4 rounded-[10px] px-4 ${otherClasses} `}
    >
      {iconPosition === 'left' && (
        <Image
          src={imgSrc} height={24} width={24} alt='icon' className='cursor-pointer'
        />
      )}
      <Input
        type='text' placeholder={placeholder}
        value={''} onChange={() => { }}
        className={`paragraph-regular no-focus placeholder text-dark400_light700
        background-light800_darkgradient border-none shadow-none outline-none `}
      />
      {iconPosition === 'right' && (
        <Image
          src={imgSrc} height={24} width={24} alt='icon' className='cursor-pointer'
        />
      )}
    </div>
  )
}

export default LocalSearchbar