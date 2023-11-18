import { useEffect, useState } from "react"

export default function Mods(props: any) {

    const [login, setLogin] = useState({} as any)
    const [author, setAuthor] = useState({ name: "Cargando..." } as any)

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
        async function getUser() {
            const token = localStorage.getItem('token')
            const data = await (await fetch("/api/users", {
                method: "POST",
                body: JSON.stringify({ "token": token, "userId": props.id })
            })).json()
            console.log(data)
            setAuthor(data?.data)
        }
        getLogin()
        getUser()
    }, [])

    return (
        <div className="border text-slate-400 bg-slate-950 border-slate-500 rounded-xl p-3 w-[80vw]">
            {
                Object.keys(login).length > 0 ?
                    <>
                        <div id="title" className="font-bold">
                            {props.title}
                        </div>
                        <div id="description">
                            {props.body.replace(/\<[A-z]+\>|\<\/[A-z]+\>/g, "")}
                        </div>
                        <div id="author" className="text-right pr-2 pl-2 text-slate-300 bg-slate-900 p-1 rounded-xl border border-slate-400">
                            {author?.name}
                        </div>
                    </>
                    :
                    <>
                        <div className="text-center">
                            Inicia sesion para visualizar el contenido 💩
                        </div>
                    </>
            }
        </div>
    )
}