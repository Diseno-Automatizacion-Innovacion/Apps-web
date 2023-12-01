"use client"
import { get } from "http"
import Link from "next/link"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation";

export default function Nav() {
    const navItemsClass = "hover:text-blue-700 duration-200 ease-in-out p-1"
    const router = useRouter()

    const [login, setLogin] = useState({} as any)

    function obtenerSaludo() {
        const fecha = new Date();
        const hora = fecha.getHours();

        let saludo = '';

        if (hora >= 6 && hora < 12) {
            saludo = 'Buenos días';
        } else if (hora >= 12 && hora < 20) {
            saludo = 'Buenas tardes';
        } else {
            saludo = 'Buenas noches';
        }

        return saludo;
    }

    useEffect(() => {
        async function getLogin() {
            const token = localStorage.getItem('token')
            if (token) {
                const data = await (await fetch("/api/auth/me", {
                    method: "POST",
                    body: JSON.stringify({ "token": token })
                })).json()
                if (data?.error == "Nope") {
                    router.refresh()
                }
                setLogin(data.user)
            }
        }
        function scroll() {
            if (window.scrollY != 0) {
                // 
                document.querySelector("#header")?.setAttribute("style", "box-shadow: 0px 2px 0px 0px rgba(0,0,255);")
            }
            else {
                document.querySelector("#header")?.setAttribute("style", "box-shadow: 0px 0px 0px 0px rgba(0,0,255);")
            }
        }
        window.addEventListener("scroll", scroll)
        getLogin()
    }, [])

    return (
        //shadow-[0px_2px_0px_0px_rgba(0,0,255)]
        <header id="header" className="fixed z-[999] bg-slate-500 p-7 w-screen text-slate-900 duration-150">
            <nav className="flex gap-8">
                <ul className="flex gap-8 text-l align-middle items-center">
                    <li className={navItemsClass}>
                        <Link href="/">Inicio</Link>
                    </li>
                    <li className={navItemsClass}>
                        <Link href="/juegos">Juegos</Link>
                    </li>
                    <li className={navItemsClass}>
                        <Link href="/foro">Foro</Link>
                    </li>
                </ul>
                <ul className='flex flex-row gap-2 m-auto mr-2'>
                    {
                        !login?.name ?
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
                                <li className={navItemsClass} onClick={() => {
                                    if (confirm("Cerrar sesion?")) {
                                        localStorage.removeItem("token")
                                        window.location.reload()
                                    }
                                }}>
                                    {obtenerSaludo()}, {login.name}
                                </li>
                            </>
                    }
                </ul>
            </nav>
        </header>
    )
}