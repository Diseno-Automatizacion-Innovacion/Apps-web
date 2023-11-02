"use client"

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

import Navigation from '@/app/components/Navigation'

export default function Juego({ params }: { params: { slug: string } }) {

    const router = useRouter()
    const [data, setData] = useState([] as any)
    useEffect(() => {
        async function getData() {
            const data = await (await fetch("/api/juegos", {
                method: "POST",
                body: JSON.stringify({
                    "query": params.slug
                })
            })).json()
            // console.log("Prueba: " + JSON.stringify(data.data[0].attributes.comments))
            document.title = "apps-web - " + data?.data[0]?.attributes?.Titulo
            if (!data?.data[0]?.attributes?.Titulo) {
                router.push("/juegos")
            }
            setData(data.data)
        }
        getData()
    }, [params.slug, router])

    return (
        <>
            <Navigation></Navigation>
            <div className='absolute top-24'>
                {
                    data.map((el: any, i: number) => {
                        return (
                            <>
                                <Image className='w-10 h-10' src={`https://strapi.garcalia.com${el?.attributes?.cover?.data?.attributes?.url || ""}`} alt={"Imagen " + params.slug} width={1920} height={1080}></Image>
                                <div id='Body'>{el?.attributes?.Body}</div>
                                <div id='Comments' className='text-white'>{
                                    el?.attributes?.comments?.data.map((el: any) => {
                                        return (
                                            <>
                                                <div id='user'>{el.attributes.user}:</div>
                                                <div id='message'>{el.attributes.message}</div>
                                            </>
                                        )
                                    })
                                }</div>
                            </>
                        )
                    })
                }
            </div>
        </>
    )
}
