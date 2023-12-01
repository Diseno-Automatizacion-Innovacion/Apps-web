"use client"

import { useEffect, useState } from "react"

import Nav from "../components/Navigation"
import IndexTitle from "../components/IndexTitle"
import Tema from "@/app/components/MainComponents/Tema"

export default function Forum() {
    const [categories, setCategories] = useState([] as any)
    useEffect(() => {
        async function getTema() {
            const token = localStorage.getItem("token")
            if (token) {
                const data = await (await fetch(`/api/foro/categories`)).json()
            }
        }
    }, [])
    return (
        <>
            <Nav></Nav>
            <IndexTitle title="Bienvenidos al Foro" secondTitle="Modink"></IndexTitle>
            <div id="temas">
                {
                    categories?.map((category: any) => {
                        return <Tema key={category.category_id} id={category.category_id} title={category.category_name} descripcion={category.category_description} ></Tema>
                    })
                }
            </div>
        </>
    )
}