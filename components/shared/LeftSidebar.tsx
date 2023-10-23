'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { SignedOut } from '@clerk/nextjs'

import { sidebarLinks } from '@/constants'

const LeftSidebar = () => {
  const pathname = usePathname()

  return (
    <section className={`background-light900_dark200 light-border sticky left-0 top-0 h-screen
    flex flex-col justify-between overflow-y-auto border-r p-6 pt-36 shadow-light-300 dark:shadow-none
    max-sm:hidden lg:w-[266px] custom-scrollbar `} >
      <div className="flex flex-1 flex-col gap-6">
        {sidebarLinks.map((link) => {
          const isActive = (pathname.includes(link.route) && link.route.length > 1 || pathname === link.route)
          return (
            <Link
              href={link.route}
              key={link.label}
              className={`${isActive
                ? "primary-gradient rounded-lg text-light-900"
                : "text-dark300_light900"
                }  flex links-center justify-start gap-4 bg-transparent p-4`}
            >
              <Image
                src={link.imgURL}
                alt={link.label}
                width={20}
                height={20}
                className={`${isActive ? "" : "invert-colors"}`}
              />
              <p className={`${isActive ? 'base-bold' : 'base-medium'} max-lg:hidden`}>{link.label}</p>
            </Link>
          )
        })}
      </div>
    </section>
  )
}

export default LeftSidebar