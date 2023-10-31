"use client"
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { motion } from "framer-motion"
import image from "../../public/images/minecraft.png"

export default function Home() {

  const [data, setData] = useState([] as any)

  useEffect(() => {
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
      alert("Mejor usa el pc")
    }
  }, [])

  return (
    <>
      <header className="fixed z-[999] bg-slate-500 p-7 w-screen text-slate-900 shadow-[0px_2px_0px_0px_rgba(0,0,255)]">
        <nav>
          <ul className="flex gap-8 text-l">
            <li className="hover:text-blue-700 duration-200 ease-in-out"><a href="http://localhost:3000/nosotros">Nosotros</a></li>
            <li className="hover:text-blue-700 duration-200 ease-in-out"><a href="http://localhost:3000/juegos">Juegos</a></li>
          </ul>
        </nav>
      </header>
      <div id="container" className=" flex font-kanit">
        <div>

        </div>
        <div className="m-0 p-0 flex items-center justify-center text-slate-300 h-screen w-screen">
          <h1 className="text-9xl align-middle">app-web</h1>
        </div>



      </div>
      <div className="flex items-center align-middle justify-center mb-10">
        <a id="minecraft" href="/juegos/minecraft" className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 duration-200 hover:shadow-[0_0px_60px_-15px_rgba(255,255,255,0.3)] ease-in-out dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
          <Image className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-l-lg" src="https://strapi.garcalia.com/uploads/download_815f3c00e7.jpg" alt="Minecraft" width={1920} height={1080} />
          <div className="flex flex-col justify-between p-4 leading-normal">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Minecraft</h5>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Ultimos mods para &quot;Minecraft&quot;</p>
          </div>
        </a>
      </div>

    </>
  )
}
