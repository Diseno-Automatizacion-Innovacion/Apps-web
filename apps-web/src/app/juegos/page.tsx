"use client"
import Image from 'next/image'
import { useState, useEffect } from 'react'

export default function Home() {

    const [data, setData] = useState([] as any)

    useEffect(() => {
        async function getData() {
            const data = await (await fetch("/api/juegos")).json()
            console.log(data.data)
            setData(data.data)
        }
        getData()
    }, [])

    return (
        <>
            {
                data.map((el: any) => {
                    return <a className='text-white' href={`/juegos/${el.id}`} id={el.id} key={el.id}>{el.attributes.Titulo}</a>
                })
            }
        </>
    )
}
