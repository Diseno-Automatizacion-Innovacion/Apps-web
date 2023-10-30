import type { Metadata } from 'next'

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
        <html lang="es_ES">
            <body >{children}</body>
        </html>
    )
}
