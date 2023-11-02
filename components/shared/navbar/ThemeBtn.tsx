"use client"

import React from 'react'
import Image from 'next/image'

import { useTheme } from '@/context/ThemeProvider'
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar"
import { themes } from '@/constants'

const ThemeBtn = () => {

  const { mode, setMode } = useTheme()

  const modeHandler = (item: any) => {

  }

  return (
    <Menubar className='relative border-none bg-transparent shadow-none' >
      <MenubarMenu>
        <MenubarTrigger
          className={`focus:bg-light-900 data-[state=open]:bg-light-900
        dark:focus:bg-dark-200 dark:data-[state=open]:bg-dark-200 hover:cursor-pointer `}
        >
          {mode === 'light'
            ? <Image className='active-theme' height={20} width={20}
              src={'/assets/icons/sun.svg'} alt='light-mode' />
            : <Image className='active-theme' height={20} width={20}
              src={'/assets/icons/moon.svg'} alt='dark-mode' />
          }
        </MenubarTrigger>
        <MenubarContent
          className={`absolute right-[-3rem] mt-3 min-w-[120px] py-2 rounded border 
         dark:border-dark-400 dark:bg-dark-300 bg-white `}
        >
          {themes.map(theme => (
            <MenubarItem key={theme.value}
              onClick={() => {
                setMode(theme.value)
                if (theme.value !== 'system') {
                  localStorage.theme = theme.value
                } else {
                  localStorage.removeItem('theme')
                }
              }}

              className={`flex items-center gap-4 px-2.5 py-2 dark:focus:bg-dark-400 hover:cursor-pointer focus:bg-slate-100  `}
            >
              <Image src={theme.icon} alt={theme.value} width={16} height={16}
                className={`${mode === theme.value && 'active-theme'} `}
              />
              <p className={`body-semibold text-light-500  
              ${mode === theme.value ? 'text-[#fff]' : ''} `} >
                {theme.label}
              </p>
            </MenubarItem>
          ))}
        </MenubarContent>
      </MenubarMenu>
    </Menubar>

  )
}

export default ThemeBtn