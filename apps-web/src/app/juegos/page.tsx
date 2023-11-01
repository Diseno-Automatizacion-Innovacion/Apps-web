"use client"
import Image from 'next/image'
import { useState, useEffect } from 'react'

import Navigation from "@/app/components/Navigation"

export default function Home() {

    const [data, setData] = useState([] as any)
    useEffect(() => {
        async function getData() {
            const data = await (await fetch("/api/juegos")).json()
            // console.log(data.data)
            setData(data.data)
        }

        getData()
    }, [])

    return (
        <div>
            <Navigation></Navigation>
            <main className='absolute top-24'>
                {
                    data.map((el: any) => {
                        return (
                            <a className='text-white' href={`/juegos/${el.attributes.slug}`} id={el.id} key={el.id}>
                                <div>{el.attributes.Titulo}</div>
                            </a>

                        )
                    })
                }
            </main>
        </div>
    )
}
