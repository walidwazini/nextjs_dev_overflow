"use client"

import React, { useState, useEffect, useContext, createContext } from 'react'

interface ThemeContextTypes {
  mode: string,
  setMode: (mode: string) => void
}

const ThemeContext = createContext<ThemeContextTypes | undefined>(undefined)

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [mode, setMode] = useState('')

  const handleThemeChange = () => {
    if (mode === 'dark') {
      setMode('light')
      document.documentElement.classList.add('light')
    }
    else {
      setMode('dark')
      document.documentElement.classList.add('dark')
    }
  }

  // useEffect(() => {
  //   handleThemeChange()
  // }, [])

  return (
    <ThemeContext.Provider value={{ mode, setMode }} >
      {children}
    </ThemeContext.Provider>
  )

}


export const useTheme = () => {
  const context = useContext(ThemeContext)

  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }

  return context
}