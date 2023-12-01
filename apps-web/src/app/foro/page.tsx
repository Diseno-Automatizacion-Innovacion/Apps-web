"use client"

import { useEffect, useState } from "react"

import Nav from "../components/Navigation"
import IndexTitle from "../components/IndexTitle"
import Tema from "../components/MainComponents/tema"

export default function Forum() {
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
        </>
    )
}