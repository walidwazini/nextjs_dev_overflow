'use client'

import React from 'react'
// import img from 'next/img'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { SignedOut, useAuth } from '@clerk/nextjs'

import { sidebarLinks } from '@/constants'
import { Button } from '../ui/button'

const LeftSidebar = () => {
  const { userId } = useAuth()
  const pathname = usePathname()

  return (
    <section className={`background-light900_dark200 light-border sticky left-0 top-0 h-screen
    flex flex-col justify-between overflow-y-auto border-r p-6 pt-36 shadow-light-300 dark:shadow-none
    max-sm:hidden lg:w-[266px] custom-scrollbar `} >
      <div className="flex flex-1 flex-col gap-6">
        {sidebarLinks.map((link) => {

          if (link.route === '/profile') {
            if (userId) {
              link.route = `${link.route}/${userId}`
            } else {
              null
            }
          }

          const isActive = (pathname.includes(link.route) && link.route.length > 1 || pathname === link.route)
          return (
            <Link
              href={link.route}
              key={link.label}
              className={`${isActive
                ? "primary-gradient text-light-900"
                : "text-dark300_light900"
                }  flex links-center justify-start gap-4 bg-transparent p-4 hover:bg-primary-500 rounded-lg`}
            >
              <img
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
      <SignedOut>
        <div className="flex flex-col gap-3">
          <Link href="/sign-in">
            <Button className="small-medium btn-secondary min-h-[41px] w-full rounded-lg px-4 py-3 shadow-none">
              <img
                src="/assets/icons/account.svg"
                alt="login"
                width={20}
                height={20}
                className="invert-colors lg:hidden"
              />
              <span className="primary-text-gradient max-lg:hidden">Log In</span>
            </Button>
          </Link>


          <Link href="/sign-up">
            <Button className='small-medium light-border-2 btn-tertiary text-dark400_light900 min-h-[41px] w-full rounded-lg border px-4 py-3 shadow-none'>
              <img
                src="/assets/icons/sign-up.svg"
                alt="sign up"
                width={20}
                height={20}
                className="invert-colors lg:hidden"
              />
              <span className="max-lg:hidden">Sign up</span>
            </Button>
          </Link>
        </div>
      </SignedOut>
    </section>
  )
}

export default LeftSidebar