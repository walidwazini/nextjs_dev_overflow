"use client"

import React from 'react'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import Link from 'next/link'
import Image from 'next/image'
import { SignedOut } from '@clerk/nextjs'

import { Button } from '@/components/ui/button'

const NavContent = () => {
  return (
    <h1>
      Nav Content
    </h1>
  )
}

const MobileNav = () => {
  return (
    <Sheet>
      <SheetTrigger>
        <Image
          src={'/assets/icons/hamburger.svg'} alt='menu' width={36} height={36}
          className='invert-colors sm:hidden'
        />
      </SheetTrigger>
      <SheetContent side={'left'}
        className='background-light900_dark200 border-none '
      >
        <Link href="/" className="flex items-center gap-1">
          <Image
            src="/assets/images/site-logo.svg"
            width={23}
            height={23}
            alt="DevOverflow"
          />
          <p className="h2-bold text-dark100_light900 font-spaceGrotesk">Dev <span className="text-primary-500">Overflow</span></p>
        </Link>
        <div>
          <SheetClose asChild >
            <NavContent />
          </SheetClose>
          {/* If we not log in..  */}
          <SignedOut>
            <div className="flex flex-col gap-3">
              {/*   LOG IN BUTTON   */}
              <SheetClose asChild>
                <Link href="/sign-in">
                  <Button className="small-medium btn-secondary min-h-[41px] w-full rounded-lg px-4 py-3 shadow-none">
                    <span className="primary-text-gradient">Log In</span>
                  </Button>
                </Link>
              </SheetClose>
              {/*   SIGN UP BUTTON   */}
              <SheetClose asChild>
                <Link href="/sign-up">
                  <Button className={`px-4 py-3 min-h-[41px] w-full border light-border-2 btn-tertiary 
                  text-dark400_light900 rounded-lg shadow-none small-medium `} >
                    Sign Up
                  </Button>
                </Link>
              </SheetClose>
            </div>
          </SignedOut>
        </div>
      </SheetContent>
    </Sheet>

  )
}

export default MobileNav