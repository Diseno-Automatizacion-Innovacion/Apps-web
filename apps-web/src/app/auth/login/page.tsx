'use client'
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"


export default function Register() {

    const router = useRouter()
    const [fetching, setFetching] = useState(false)

    useEffect(() => {
        async function loginCall(event: any) {
            if (event?.key != "Enter" && event?.key != undefined) {
                // 
                return
            }
            setFetching(true)
            const avoidEmptyStrings = /\s/g
            const avoidSymbols = /[^A-z \d]/g
            const validEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

            /* ------------------------------ Validar email ----------------------------- */

            const email = (document.querySelector("#Email") as HTMLInputElement)?.value

            if (!email) {
                alert("Introduce un email o usuario")
                setFetching(false)
                return
            }
            if (email.match(avoidEmptyStrings)) {
                alert("El usuario no puede contener espacios")
                setFetching(false)
                return
            }

            /* --------------------------- Validar contraseña --------------------------- */

            const password = (document.querySelector("#Password") as HTMLInputElement)?.value

            if (!password) {
                alert("Introduce una contraseña")
                setFetching(false)
                return
            }

            const data = await (await fetch('/api/auth/login', {
                method: "POST",
                body: JSON.stringify({
                    // "user": user,
                    "email": email,
                    "password": password
                })
            })).json()
            console.log(data)
            if (data?.error) {
                alert(data.error)
                localStorage.removeItem("token")
                setFetching(false)
                return
            }

            if (data?.token) {
                console.log("hola")
                localStorage.setItem("token", data?.token)
                router.back()
            }

        }

        document.querySelector("#Register")?.addEventListener("click", loginCall)
        document.addEventListener("keydown", loginCall)

    }, [router])

    return (
        <>
            {/* <Navigation></Navigation> */}
            <div id="container" className="flex justify-center items-center h-screen bg-slate-900">
                <div className="flex flex-col gap-2 justify-center items-center sm:w-[40vw] h-[60vh] sm:aspect-[1.61803398875] aspect-[9/16] bg-slate-600 rounded">
                    <input type="email" id="Email" className="rounded p-2 text-center" placeholder="Email o usuario" />
                    <input type="password" id="Password" className="rounded p-2 text-center" placeholder="Password" />
                    <input type="button" disabled={fetching} id="Register" className="cursor-pointer p-2 bg-slate-500 rounded" value={fetching ? "Espere..." : "Iniciar sesion"} />
                </div>
            </div>
        </>
    )
}