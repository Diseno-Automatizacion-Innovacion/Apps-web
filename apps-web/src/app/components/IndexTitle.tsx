"use client"
import { useEffect, useState } from "react"



export default function IndexTitle(props: any) {

    const [displayTitle, setDisplayTitle] = useState(props.title)

    const sleep = (ms: number) => new Promise(r => setTimeout(r, ms))

    useEffect(() => {
        let first = true
        async function animateTitle() {
            const displayText = (first ? props.title : props.secondTitle) as string
            for (let i = 0; i <= displayText.length; i++) {
                setDisplayTitle(displayText.slice(0, i))
                // if (props.title[i] != " ")
                await sleep(300)
            }
            for (let i = displayText.length; i >= 0; i--) {
                setDisplayTitle(displayText.slice(0, i))
                await sleep(100)
            }
            await sleep(500)
            first = !first
            animateTitle()
        }
        animateTitle()
    }, [])

    return (
        <div id="container" className="flex font-kanit">
            <div className="m-0 p-0 flex items-center justify-center bg-gradient-to-t from-slate-900 via-slate-500 to-slate-500 text-slate-300 h-screen w-screen">
                <h1 className="text-9xl align-middle">
                    {displayTitle}
                    <span className="text-[rgb(0,0,255)] animate-blink">|</span>
                </h1>
            </div>
        </div>
    )
}