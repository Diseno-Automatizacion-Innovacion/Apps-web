"use client"

import { useEffect, useState } from "react"

import Nav from "@/app/components/Navigation"

export default function ModPage({ params }: { params: { mod: string } }) {
    const [mod, setMod] = useState({} as any)
    // let parent = document.title.replace("Modink | ", "")

    useEffect(() => {
        async function getModInfo() {
            const data = await (await fetch(`/api/mod/${params.mod}`)).json()
            console.log(data)
            setMod(data.data)
        }
        // parent = document.title.replace("Modink | ", "")
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
                <input type="button" value="⬇️" onClick={async () => {
                    let a = document.createElement("a")
                    const data = await (await fetch(`/api/mod/download/${mod?.id}`)).json()
                    console.log(data?.data)

                    // TODO: Descomentar cuando esto funcione
                    // a.href = data?.data
                    // a.click()
                }} />
            </div>
        </>
    )
}