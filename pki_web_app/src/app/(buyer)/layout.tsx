import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '../../styles/globals.css'
import Navbar from '@/components/Navbar'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Buyer menu',
  description: 'Buyer menu',
}

export default function BuyerLayoyt({
  children,
}: {
  children: React.ReactNode
}) {
  return (
      <div>
        <Navbar />
        {children}
      </div>
  )
}
