"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"

import Comment from "@/app/components/MainComponents/Comment"
import Nav from "@/app/components/Navigation"

export default function ModPage({ params }: { params: { mod: string } }) {
    const [mod, setMod] = useState({} as any)
    const [login, setLogin] = useState({} as any)
    const [comments, setComments] = useState([] as any)

    const router = useRouter()

    // console.log(Object.keys(mod).length)

    // let parent = document.title.replace("Modink | ", "")

    const formatDate = (fechaGMT: string) => {
        const fechaActual = new Date(fechaGMT);

        const horas = fechaActual.getUTCHours().toString().padStart(2, '0');
        const minutos = fechaActual.getUTCMinutes().toString().padStart(2, '0');
        const dia = fechaActual.getUTCDate();
        const mes = (fechaActual.getUTCMonth() + 1); // Meses van de 0 a 11
        const anio = fechaActual.getUTCFullYear();

        const fechaFormateada = `${horas}:${minutos} ${dia}/${mes}/${anio}`;

        return fechaFormateada;
    };

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
            getComments(data?.data?.id)
            setMod(data.data)
        }
        async function getComments(id: number) {
            const data = await (await fetch(`/api/comments/${id}/1`)).json()
            console.log(data.data)
            setComments(data.data)
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
                            <div className="text-center min-w-[20%] justify-center border rounded-xl bg-slate-950 max-w-fit">
                                <div className="p-2">
                                    {mod?.excerpt?.rendered.replace(/\<[A-z]+\>|\<\/[A-z]+\>/g, "")}
                                </div>
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

                            <div>
                                <div className="font-semibold text-3xl text-center">
                                    Comentarios
                                </div>
                                <hr />
                                <br />
                                <div className="flex justify-center">
                                    <textarea name="newComment" placeholder="Escribe tu comentario..." id="newComment" className="text-slate-300 border border-slate-300 rounded-xl bg-slate-700 resize-none w-[60vw] p-2 h-20" />
                                    <button className="h-[10%] left-[-63px] top-[55px] relative items-center w-20 hover:bg-slate-800 duration-150 justify-center flex text-center bg-slate-900 border-slate-300 border p-2 rounded-xl">
                                        Enviar
                                    </button>
                                </div>

                                <br />

                                {
                                    comments?.map((comment: any, i: number) => {
                                        return <Comment key={i} comment={comment?.content?.rendered.replace(/\<[A-z]+\>|\<\/[A-z]+\>/g, "")} authorName={comment?.author_name} date={formatDate(comment?.date_gmt)} />
                                    })
                                }
                                {/* <Comment comment="hola" authorName="Rubeneitor2" date={2} /> */}
                            </div>
                        </div>
                        :
                        <div className="flex items-center w-screen h-screen justify-center text-white font-bold">
                            No se encuentra el mod solicitado
                        </div>
                    :
                    <div className="flex items-center w-screen h-screen justify-center text-white font-bold">
                        Inicie sesion, por favor
                    </div>
            }
        </>
    )
}