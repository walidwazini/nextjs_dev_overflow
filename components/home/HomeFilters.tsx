"use client"

import React, { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

import { Button } from '../ui/button'
import { HomePageFilters } from '@/constants/filters'
import { formUrlQuery } from '@/lib/utils'

const HomeFilters = () => {
  const searchParams = useSearchParams()
  const router = useRouter()

  const [active, setActive] = useState('newest')

  const handleTypeClick = (item: string) => {
    if (active === item) {
      setActive("");

      const newUrl = formUrlQuery({
        params: searchParams.toString(),
        key: 'filter',
        value: null
      })

      router.push(newUrl, { scroll: false });
    } else {
      setActive(item);

      const newUrl = formUrlQuery({
        params: searchParams.toString(),
        key: 'filter',
        value: item.toLowerCase()
      })

      router.push(newUrl, { scroll: false });
    }
  }

  return (
    <div className='mt-10 hidden md:flex flex-wrap gap-3' >
      {HomePageFilters.map(item => (
        <Button key={item.value}
          onClick={() =>handleTypeClick(item.value)}
          className={`body-medium rounded-lg px-6 py-3 capitalize shadow-none 
        ${active === item.value
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