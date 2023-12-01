"use client"

import { useEffect, useState } from "react"

import Nav from "@/app/components/Navigation"
import IndexTitle from "@/app/components/IndexTitle"
import Tema from "@/app/components/MainComponents/Tema"

export default function Forum() {

    const [categories, setCategories] = useState([] as any)

    useEffect(() => {
        async function getTema() {
            const token = localStorage.getItem("token")

            const data = await (await fetch(`/api/forum/categories/`)).json()
            setCategories(data.temas)
        }
        getTema()
    }, [])
    return (
        <>
            <Nav></Nav>
            <IndexTitle title="Bienvenidos al Foro" secondTitle="Modink"></IndexTitle>
            <div id="temas">
                {
                    categories?.map((category: any, i: number) => {
                        return <Tema key={category.category_id} id={category.category_id} title={category?.category_name} descripcion={category?.category_description}></Tema>
                    })
                }
            </div>
        </>
    )
}