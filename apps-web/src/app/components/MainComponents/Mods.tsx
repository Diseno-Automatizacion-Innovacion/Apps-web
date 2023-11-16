import { useEffect, useState } from "react"

export default function Mods(props: any) {

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
    })

    return (
        <div className="border border-slate-500 p-3">
            {
                Object.keys(login).length > 0 ?
                    <>
                        <div id="title" className="font-bold">
                            {props.title}
                        </div>
                        <div id="description">
                            {props.body}
                        </div>
                    </>
                    :
                    <>
                        <div className="font-bold text-center">
                            Inicia sesion para visualizar el contenido
                        </div>
                    </>
            }
        </div>
    )
}