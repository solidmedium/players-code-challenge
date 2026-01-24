import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import Image from 'next/image'
import Link from 'next/link'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Players Code Challenge',
  description: 'Created by: Davin McDonald',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <>
          <div className="flex min-h-screen flex-col">
            <header>
              <Link href="/" className="text-2xl font-bold text-white flex items-center justify-center bg-primary px-6 py-4">
                Wrenegade Depth Chart{' '}
              </Link>
            </header>
            {children}
          </div>
        </>
      </body>
    </html>
  )
}
