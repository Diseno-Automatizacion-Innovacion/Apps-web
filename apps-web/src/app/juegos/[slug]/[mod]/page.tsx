"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"

import Comment from "@/app/components/MainComponents/Comment"
import Nav from "@/app/components/Navigation"

export default function ModPage({ params }: { params: { mod: string } }) {
    const [mod, setMod] = useState({} as any)
    const [login, setLogin] = useState({} as any)
    const router = useRouter()

    // console.log(Object.keys(mod).length)

    // let parent = document.title.replace("Modink | ", "")

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
        async function getModInfo() {
            const data = await (await fetch(`/api/mod/${params.mod}`)).json()
            console.log(data)
            setMod(data.data)
        }
        getLogin()
        getModInfo()
        document.title = "Modink | " + params.mod.split('-').map((palabra) => palabra.charAt(0).toUpperCase() + palabra.slice(1)).join(' ')
    }, [params.mod])

    return (
        <>
            <Nav></Nav>
            {
                Object.keys(login).length > 0 ?
                    mod?.title ?
                        <div className="flex flex-col w-full gap-8 items-center justify-center text-white absolute top-28">
                            <div className="font-bold text-6xl">
                                {mod?.title?.rendered}
                            </div>
                            <div className="text-center w-[20%] justify-center border rounded-xl bg-slate-950">
                                <div className="p-2">
                                    {mod?.excerpt?.rendered.replace(/\<[A-z]+\>|\<\/[A-z]+\>/g, "")}
                                </div>
                            </div>

                            <div className=" bg-blue-300 w-[30%] aspect-[16/9]">

                            </div>

                            <button className="align-center bg-gray-500 hover:bg-gray-600 text-gray-950 font-bold py-2 px-4 rounded-xl inline-flex align-items-center" onClick={async () => {

                                /* ------------------------------ Cargar datos ------------------------------ */
                                const data = await (await fetch(`/api/mod/download/${mod?.id}`)).json().catch(_ => { })
                                const [buffer, extension] = data?.data.replace(/\<[A-z]+\>|\<\/[A-z]+\>/g, "").split("extension")

                                /* ------------------------ Parsear de b64 a binario ------------------------ */
                                let binaryString = atob(buffer).split(',')
                                var byteArray = new Uint8Array(binaryString.length);

                                for (var i = 0; i < binaryString.length; i++) {
                                    byteArray[i] = parseInt(binaryString[i])
                                }

                                /* ------------------------- Cargar blob y descargar ------------------------ */
                                var blob = new Blob([byteArray])
                                let a = document.createElement("a")
                                a.download = mod.title.rendered + "." + extension
                                a.href = URL.createObjectURL(blob)
                                a.click()

                            }}>
                                <svg className="fill-current w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z" /></svg>
                                <span>Descargar Mod</span>

                            </button>
                            <br />
                            <div>
                                <div className="font-semibold text-3xl">
                                    Comentarios
                                </div>
                                <hr />
                                <br />
                                <Comment comment="hola" />
                            </div>
                        </div>
                        :
                        <div className="flex items-center w-screen h-screen justify-center text-white font-bold">
                            No se encuentra el mod solicitado
                        </div>
                    :
                    <div className="flex items-center w-screen h-screen justify-center text-white font-bold">
                        Inicia sesion, por favor, matao
                    </div>
            }
        </>
    )
}