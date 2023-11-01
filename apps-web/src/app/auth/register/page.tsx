'use client'
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"


export default function Register() {

    const router = useRouter()
    const [fetching, setFetching] = useState(false)

    useEffect(() => {
        async function registerCall() {
            setFetching(true)
            const avoidEmptyStrings = /\s/g
            const avoidSymbols = /[^A-z \d]/g
            const validEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;


            /* ----------------------------- Validar usuario ---------------------------- */

            const user = (document.querySelector("#User") as HTMLInputElement)?.value

            if (!user) {
                alert("Introduce un usuario")
                setFetching(false)
                return
            }
            else if (user.match(avoidEmptyStrings)) {
                alert("El usuario no debe contener espacios")
                setFetching(false)
                return
            }
            else if (user.match(avoidSymbols)) {
                alert("El usuario solo puede contener letras y numeros")
                setFetching(false)
                return
            }

            /* ------------------------------ Validar email ----------------------------- */

            const email = (document.querySelector("#Email") as HTMLInputElement)?.value

            if (!email) {
                alert("Introduce un email")
                setFetching(false)
                return
            }
            if (!validEmail.test(email)) {
                alert("El email introducido no es valido")
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
            else if (password.length < 6) {
                alert("La contraseña debe contener al menos 6 caracteres")
                setFetching(false)
                return
            }
            else if (password.match(/^\s/)) {
                alert("La contraseña no puede empezar con un espacio")
                setFetching(false)
                return
            }

            const data = await (await fetch('/api/auth/register', {
                method: "POST",
                body: JSON.stringify({
                    "user": user,
                    "email": email,
                    "password": password
                })
            })).json()

            if (data?.error) {
                alert(data.error)
                setFetching(false)
                return
            }

            if (data?.token) {
                localStorage.setItem("token", data?.token)
                router.push("/")
            }

        }

        document.querySelector("#Register")?.addEventListener("click", registerCall)

    }, [router])

    return (
        <>
            {/* <Navigation></Navigation> */}
            <div id="container" className="flex justify-center items-center h-screen bg-slate-900">
                <div className="flex flex-col gap-2 justify-center items-center w-[40vw] aspect-[1.61803398875] bg-slate-600 rounded">
                    <input type="text" id="User" className="rounded p-2 text-center" placeholder="User" />
                    <input type="email" id="Email" className="rounded p-2 text-center" placeholder="Email" />
                    <input type="password" id="Password" className="rounded p-2 text-center" placeholder="Password" />
                    <input type="button" id="Register" className="cursor-pointer p-2 bg-slate-500 rounded" value={fetching ? "Espere..." : "Crear usuario"} />
                </div>
            </div>
        </>
    )
}