import type { Metadata } from 'next'
import '../globals.css'

export const metadata: Metadata = {
    title: 'apps web - Juegos',
    description: 'JEJEJE',
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="es">
            <body>{children}</body>
        </html>
    )
}
