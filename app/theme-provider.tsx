//  Alternative theme provider using npm package
"use client"

import React from 'react'
import { ThemeProvider } from 'next-themes'

interface ProvideTypes {
  children: React.ReactNode,
  props: any
}

const NextThemeProvider = ({ children, props }: ProvideTypes) => (
  <ThemeProvider {...props} >
    {children}
  </ThemeProvider>
);

export default NextThemeProvider
