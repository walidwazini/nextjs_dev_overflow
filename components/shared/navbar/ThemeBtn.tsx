"use client"

import React from 'react'
import Image from 'next/image'

import { useTheme } from '@/context/ThemeProvider'
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from "@/components/ui/menubar"

const ThemeBtn = () => {

  const { mode, setMode } = useTheme()

  return (
    <Menubar className='relative border-none bg-transparent shadow-none' >
      <MenubarMenu>
        <MenubarTrigger>
          {mode === 'light'
            ? <Image className='active-theme' height={20} width={20}
              src={'/assets/icons/moon.svg'} alt='moon' />
            : <Image className='active-theme' height={20} width={20}
              src={'/assets/icons/sun.svg'} alt='sun' />
          }
        </MenubarTrigger>
        <MenubarContent>
          <MenubarItem>
            New Tab <MenubarShortcut>⌘T</MenubarShortcut>
          </MenubarItem>
          <MenubarItem>New Window</MenubarItem>
          <MenubarSeparator />
          <MenubarItem>Share</MenubarItem>
          <MenubarSeparator />
          <MenubarItem>Print</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>

  )
}

export default ThemeBtn