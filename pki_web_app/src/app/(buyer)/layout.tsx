import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '../../styles/globals.css'
import NavbarBuyer from '@/components/NavbarBuyer'

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
        <NavbarBuyer />
        {children}
      </div>
  )
}
