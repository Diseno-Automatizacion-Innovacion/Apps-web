"use client"
import Image from 'next/image'
import { useState, useEffect } from 'react'
import GameTag from '@/app/components/MainComponents/GamesTag'
import Navigation from "@/app/components/Navigation"

export default function Home() {

    const [juegos, setJuegos] = useState([] as any)

    useEffect(() => {
        async function getJuegos() {
            const data = await (await fetch("/api/juegos")).json()
            console.log(data?.juegos)
            setJuegos(data?.juegos)
        }
        getJuegos()
    }, [])

    return (
        <div>
            <Navigation></Navigation>
            <main className='flex sm:flex-row-reverse flex-col gap-3 absolute top-20 m-3'>
                {juegos?.map((juego: any, i: number) => {
                    return <GameTag key={i} slug={juego?.slug} name={juego?.name} count={juego?.count} />
                })}
            </main>
        </div>
    )
}