'use client'

import React from 'react'
import Image from 'next/image'

import { Input } from "@/components/ui/input"



const GlobalSearch = () => {
  return (
    <div className="relative w-full max-w-[600px] max-lg:hidden">
      <div className="background-light800_darkgradient relative flex min-h-[48px] md:min-h-[56px] grow items-center gap-1 rounded-xl px-4">
        {/* <Image src={'/assets/icons/search.svg'} alt='search' width={24} height={24} className='cursor-pointer' /> */}
        <Image src={'/assets/icons/search.svg'} alt='search' width={0} height={0} className='cursor-pointer h-4 w-4 ' />
        <Input
          type='text' placeholder='Search globally'
          // value={''}
          className={`paragraph no-focus placeholder background-light800_darkgradient 
          border-none shadow-none outline-none  `}
        />
      </div>
    </div>
  )
}

export default GlobalSearch