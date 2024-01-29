import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '../../styles/globals.css'
import NavbarEmployee from '@/components/NavbarEmployee'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Employee menu',
  description: 'Employee menu',
}

export default function EmployeeLayoyt({
  children,
}: {
  children: React.ReactNode
}) {
  return (
      <div>
        <NavbarEmployee />
        {children}
      </div>
  )
}
