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
            document.title = "Modink | " + params.slug.split('-').map((palabra) => palabra.charAt(0).toUpperCase() + palabra.slice(1)).join(' ')
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
                            {/* TODO: Acuerdate de cambiar esto para que no de puto asco :D */}
                            <IndexTitle title={params.slug.split('-').map((palabra) => palabra.charAt(0).toUpperCase() + palabra.slice(1)).join(' ')} secondTitle="Mods"></IndexTitle>

                            <div id='Mods' className='flex flex-col items-center gap-2'>
                                <div className="border font-bold justify-center p-3 rounded-xl border-slate-500 text-gray-300 bg-slate-900 m-8" id='Descripcion'>
                                    {mods.descripcion || "No hay descripcion"}
                                </div>
                                {
                                    mods?.mods?.map((el: any, i: number) => {
                                        console.log(el.slug)
                                        return (
                                            <div key={i}>
                                                <Mods parentSlug={params.slug} slug={el.slug} id={el?.author} title={el?.title?.rendered} body={el?.excerpt?.rendered} />
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
