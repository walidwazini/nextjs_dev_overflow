"use client"

import React, { useEffect, useState } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

import { CustomInputProps } from '@/types'
import { Input } from '@/components/ui/input'
import { formUrlQuery, removeKeysFromQuery } from '@/lib/utils'

const LocalSearchbar = ({ route, iconPosition, imgSrc, placeholder, otherClasses }: CustomInputProps) => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const query = searchParams.get('q')

  const [search, setSearch] = useState(query || '')

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (search) {
        const newUrl = formUrlQuery({
          params: searchParams.toString(),
          key: 'q',
          value: search
        })
        router.push(newUrl, { scroll: false })
      }
      // if we delete query 
      else {
        console.log({ pathname, route })
        if (pathname === route) {
          const newUrl = removeKeysFromQuery({
            params: searchParams.toString(),
            keysToRemove: ['q']
          })

          router.push(newUrl, { scroll: false });
        }
      }
    }, 300)

    return () => clearTimeout(delayDebounce)
  }, [search, route, pathname, router, searchParams, query])

  return (
    <div
      className={`background-light800_darkgradient flex min-h-[56px] 
      grow items-center gap-4 rounded-[10px] px-4 ${otherClasses} `}
    >
      {iconPosition === 'left' && (
        <img
          src={imgSrc} height={24} width={24} alt='icon' className='cursor-pointer'
        />
      )}
      <Input
        type='text' placeholder={placeholder}
        value={search}
        onChange={ev => setSearch(ev.target.value)}
        className={`paragraph-regular no-focus placeholder text-dark400_light700
        background-light800_darkgradient border-none shadow-none outline-none `}
      />
      {iconPosition === 'right' && (
        <img
          src={imgSrc} height={24} width={24} alt='icon' className='cursor-pointer'
        />
      )}
    </div>
  )
}

export default LocalSearchbar