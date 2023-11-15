"use client"

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

import Navigation from '@/app/components/Navigation'

export default function Juego({ params }: { params: { slug: string } }) {

    const router = useRouter()

    const [mods, setMods] = useState([] as any)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function getData() {
            const data = await (await fetch("/api/juegos", {
                method: "POST",
                body: JSON.stringify({
                    "query": params.slug
                })
            })).json()
            // 
            document.title = "apps-web - " + params.slug
            setMods(data.data)
            setLoading(false)
        }
        getData()
    }, [params.slug, router])

    return (
        <>
            <Navigation></Navigation>
            <div className='absolute text-white top-24'>
                {!loading ?
                    mods?.mods?.length > 0 ?
                        mods?.mods?.map((el: any, i: number) => {
                            return (
                                <>
                                    <Image className='w-10 h-10' src={`https://wpbackend.garcalia.com/index.php/wp-content/uploads/${params.slug}.jpg`} alt={"Imagen: " + params.slug} width={1920} height={1080}></Image>
                                    <br />
                                    <div id='Descripcion'>{mods.descripcion || "No hay descripcion"}</div>
                                    <div id='Mods'></div>
                                </>
                            )
                        })
                        :
                        <>
                            <div>Parece que esta categoria todavia no tiene mods o no existe</div>
                            <Link href="/juegos">Volver</Link>
                        </>
                    :
                    <div>Cargando, por favor espere</div>
                }
            </div >
        </>
    )
}
