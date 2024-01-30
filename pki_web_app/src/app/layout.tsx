import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '../styles/globals.css'
import { StoreWrapper } from '@/stores/storeContext' 

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Slatki zalogaji',
  description: 'Aplikacija za slatkise',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
      <html lang="en">
        <StoreWrapper>
          <body className={inter.className}>{children}</body>
        </StoreWrapper>
      </html>
  )
}
