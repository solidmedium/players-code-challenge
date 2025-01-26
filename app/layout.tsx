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
              <Link href="/" className="bg-primary flex items-center justify-center px-6 py-4">
                <Image src="/sportsbet_logo_large.png" alt="Players Logo" width={150} height={32} />
              </Link>
            </header>
            {children}
          </div>
        </>
      </body>
    </html>
  )
}
