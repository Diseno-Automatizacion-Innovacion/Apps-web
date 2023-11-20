"use client"

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import Nav from "@/app/components/Navigation";
import { clearTimeout } from "timers";
import { tree } from "next/dist/build/templates/app-page";

export default function Publish() {

    const [login, setLogin] = useState({} as any)
    const [subirText, setSubiText] = useState("Subir archivo")
    const [cargando, setCargando] = useState(false)
    const [slug, setSlug] = useState("")

    const router = useRouter()

    useEffect(() => {
        async function getLogin() {
            const token = localStorage.getItem('token')
            if (token) {
                const data = await (await fetch("/api/auth/me", {
                    method: "POST",
                    body: JSON.stringify({ "token": token })
                })).json()
                if (data?.error == "Nope") {
                    localStorage.removeItem("token")
                }
                setLogin(data.user)
            }
        }
        // console.log(window.location.href.split("/"))
        setSlug(window.location.href.split("/")[4].toString())
        getLogin()
    }, [])

    return (
        <>
            <Nav></Nav>

            <div className="flex flex-col items-center justify-center h-screen">
                {
                    Object.keys(login).length > 0 ?
                        <form className="flex flex-col sm:w-[60vw] sm:aspect-[1.36666] h-[60vh] aspect-[9/16] bg-slate-500 rounded">

                            <input type="text" name="Title" placeholder="Titulo" id="title" className="p-2 m-2 w-1/3 rounded text-center" />

                            <label className="m-2 p-2 text-center min-w-1/3 w-fit rounded bg-blue-400 cursor-pointer hover:bg-blue-600 duration-150 ease-in-out">
                                {subirText}
                                <input id="subir" type="file" className="hidden" onChange={(e) => {
                                    let file = e?.target?.files
                                    if (file) {
                                        console.log(file[0].name)
                                        setSubiText(file[0].name)
                                    }
                                }} />
                            </label>

                            <textarea name="Descripcion" id="descripcion" placeholder="Descripcion" className="p-1 m-2 h-full rounded resize-none" />

                            <input type="button" value="Publicar" id="upload" className="self-end m-2 p-2 rounded bg-blue-400 hover:bg-blue-600 duration-150 ease-in-out" onClick={async (e) => {
                                const sleep = (ms: number) => new Promise(r => setTimeout(r, ms))

                                const title = (document.querySelector("input#title") as HTMLInputElement).value
                                if (!title) {
                                    alert("Introduce un titulo")
                                    setCargando(false)

                                    return
                                }

                                const description = (document.querySelector("textarea#descripcion") as HTMLInputElement)?.value
                                if (!description) {
                                    alert("Añade una descripcion")
                                    setCargando(false)

                                    return
                                }

                                const files = (document.querySelector("input#subir") as HTMLInputElement).files
                                let file: any
                                if (files) {
                                    if (!files[0]) {
                                        alert("Añade un archivo")
                                        setCargando(false)

                                        return
                                    }
                                    const reader = new FileReader()

                                    reader.onload = async function (r) {
                                        file = await r?.target?.result
                                    }
                                    reader.readAsArrayBuffer(files[0])
                                    reader.onloadend = async () => {
                                        if (file) {
                                            let binary = new Uint8Array(file)
                                            file = btoa(binary.toString())
                                        }
                                        const data = await (await fetch(`/api/mod/${slug}`, {
                                            "method": "POST",
                                            "body": JSON.stringify({
                                                "title": title,
                                                "description": description,
                                                "file": file + "extension" + files[0].name.split(".")[1],
                                                "token": localStorage.getItem("token")
                                            })
                                        })).json().catch(e => console.log(e))
                                        console.log(data.a)
                                        router.push(`/juegos/${slug}/${data.a.slug}`)
                                    }
                                }
                                else {
                                    alert("Añade un archivo")
                                }
                                setCargando(false)

                            }} />

                        </form>
                        :
                        <div className="flex flex-col items-center justify-center sm:w-[60vw] sm:aspect-[1.36666] h-[60vh] aspect-[9/16] bg-slate-500 rounded">
                            Debes iniciar sesion para publicar contenido
                        </div>
                }
            </div>

        </>
    )
}