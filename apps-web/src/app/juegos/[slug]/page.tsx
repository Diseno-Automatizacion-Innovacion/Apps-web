"use client"

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

import Navigation from '@/app/components/Navigation'
import Mods from '@/app/components/MainComponents/Mods'
import IndexTitle from '@/app/components/IndexTitle'

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
            <div className='text-white w-full h-screen items-center justify-center'>
                {!loading ?
                    mods?.mods?.length > 0 ?
                        <>
                            {/* <Image className='w-10 h-10' src={`https://wpbackend.garcalia.com/index.php/wp-content/uploads/${params.slug}.jpg`} alt={"Imagen: " + params.slug} width={1920} height={1080}></Image> */}
                            {/* <br /> */}
                            {/* TODO: Acuerdate de cambiar esto para que no de puto asco :D */}
                            <IndexTitle title={params.slug.split('-').map((palabra) => palabra.charAt(0).toUpperCase() + palabra.slice(1)).join(' ')} secondTitle="Mods"></IndexTitle>
                            {/* <div id='Descripcion'>{mods.descripcion || "No hay descripcion"}</div> */}
                            <div id='Mods'>
                                {
                                    mods?.mods?.map((el: any, i: number) => {
                                        return (
                                            <div key={i}>
                                                <Mods title={el?.title?.rendered} descripcion={el?.content?.rendered}></Mods>
                                                <br />
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </>
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
