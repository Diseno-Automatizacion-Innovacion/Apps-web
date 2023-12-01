import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '../globals.css'


const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Modink | Portal de Mods',
  description: 'Modink portal de mods',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body >{children}</body>
    </html>
  )
}
