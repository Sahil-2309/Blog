import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.scss'
import React, { useEffect, useState } from 'react'
import { Header } from '../components'
const inter = Inter({ subsets: ['latin'] })
import { motion } from 'framer-motion'
export const metadata: Metadata = {
  title: 'Blog',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <Header />
        {children}
      </body>
    </html>
  )
}
