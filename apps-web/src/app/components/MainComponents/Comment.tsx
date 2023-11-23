

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"

// import imagen from "../../../../public/download.svg"

export default function Comment(props: any) {

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
        // getUser()
    }, [props.id])

    return (
        <>
            <div className="flex flex-col border rounded-xl p-2">
                <div>
                    <span className="font-bold">
                        {props?.authorName}
                    </span>
                    <span className="tooltip font-light italic float-right">
                        {props?.date.split(" ")[0]}
                        <span className="tooltiptext">
                            {props?.date}
                        </span>
                    </span>

                </div>
                {props?.comment}
            </div>
            <br />
        </>
    )
}