"use client"

import { HomePageFilters } from '@/constants/filters'
import React from 'react'

import { Button } from '../ui/button'

const HomeFilters = () => {
  const isActive = 'frequent'

  return (
    <div className='mt-10 hidden md:flex flex-wrap gap-3' >
      {HomePageFilters.map(item => (
        <Button key={item.value} onClick={()=> {}}
        className={`body-medium rounded-lg px-6 py-3 capitalize shadow-none 
        ${isActive === item.value 
          ? 'bg-primary text-primary-500' 
          : 'bg-light-800 text-light-500 hover:bg-light-800 dark:bg-dark-200 dark:text-light-500 dark:hover:bg-dark-400 '}
          `}
        >
            {item.name}
        </Button>
      ))}
    </div>
  )
}

export default HomeFilters