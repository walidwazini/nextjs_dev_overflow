"use client"

import React from 'react'

import { useTheme } from '@/context/ThemeProvider'

const themeList = ['light', 'dark', 'system']

const DemoThemeButton = () => {
  const { mode, setMode } = useTheme()

  return (
    <div>
      <button
        className='bg-red-800 color-white px-3 py-2 rounded-md '
        onClick={() => {
          if (mode === '') {
            localStorage.setItem('theme', 'dark')
            document.documentElement.classList.add('dark')
            setMode('dark')
          }
          if (mode === 'dark') {
            localStorage.setItem('theme', 'light')
            document.documentElement.classList.remove('dark')
            setMode('light')
          }
          if (mode === 'light') {
            localStorage.setItem('theme', 'dark')
            document.documentElement.classList.add('dark')
            setMode('dark')
          }
        }}
        type='button'
      >
        Theme
      </button>
    </div>
  )
}

export default DemoThemeButton