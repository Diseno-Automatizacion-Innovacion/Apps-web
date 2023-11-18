"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

import Nav from "@/app/components/Navigation"

export default function ModPage({ params }: { params: { mod: string } }) {
    const [mod, setMod] = useState({} as any)
    const [login, setLogin] = useState({} as any)
    const router = useRouter()

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
            <div className="text-white absolute top-28">
                <div className="font-bold">
                    {mod?.title?.rendered}
                </div>
                <div>
                    {mod?.excerpt?.rendered.replace(/\<[A-z]+\>|\<\/[A-z]+\>/g, "")}
                </div>
                {/* ----------- Añadir que solo funcione logueado e icono de carga ----------- */}
                <input type="button" value="⬇️" className="cursor-pointer" onClick={async () => {

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
                    a.download = "archivo." + extension
                    a.href = URL.createObjectURL(blob)
                    a.click()

                }} />
            </div>
        </>
    )
}