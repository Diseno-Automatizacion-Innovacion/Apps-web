"use client"
import Image from 'next/image'
import { useState, useEffect } from 'react'
import Link from 'next/link'

import Navigation from "@/app/components/Navigation"
import IndexTitle from './components/IndexTitle'
import GameTag from './components/MainComponents/GamesTag'


export default function Home() {

  const sleep = (ms: number) => new Promise(r => setTimeout(r, ms))

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
    <div className='bg-slate-900'>
      <Navigation></Navigation>
      <IndexTitle title="Modink" secondTitle="Portal de Mods"></IndexTitle>

      {juegos?.map((juego: any, i: number) => {
        return <GameTag key={i} slug={juego?.slug} name={juego?.name} count={juego?.count} />
      })}

      {/* <GameTag slug="minecraft" /> */}
    </div>
  )
}
