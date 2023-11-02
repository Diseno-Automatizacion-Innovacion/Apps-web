"use client"
import { get } from "http"
import Link from "next/link"
import { useEffect, useState } from "react"

export default function Nav() {
    const navItemsClass = "hover:text-blue-700 duration-200 ease-in-out p-1"

    const [login, setLogin] = useState({} as any)

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
        getLogin()
    }, [])

    return (
        <header className="fixed z-[999] bg-slate-500 p-7 w-screen text-slate-900 shadow-[0px_2px_0px_0px_rgba(0,0,255)]">
            <nav className="flex gap-8">
                <ul className="flex gap-8 text-l align-middle items-center">
                    <li className={navItemsClass}>
                        <Link href="/">Nosotros</Link>
                    </li>
                    <li className={navItemsClass}>
                        <Link href="/juegos">Juegos</Link>
                    </li>

                </ul>
                <ul className='flex flex-row gap-2 m-auto mr-2'>
                    {
                        !login?.username ?
                            <>
                                <li className={navItemsClass + ""}>
                                    <Link href="/auth/register">Crear usuario</Link>
                                </li>
                                <li className={navItemsClass + " bg-slate-700 rounded text-white"}>
                                    <Link href="/auth/login">Iniciar sesion</Link>
                                </li>
                            </>
                            :
                            <>
                                <li className={navItemsClass}>
                                    Bienvenido, {login.username}
                                </li>
                            </>
                    }
                </ul>
            </nav>
        </header>
    )
}