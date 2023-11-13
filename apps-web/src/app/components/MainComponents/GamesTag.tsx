
import Image from 'next/image'
import { useEffect, useState } from 'react'



export default function GameTag(props: any) {

    return (
        <div className="flex items-center align-middle justify-center mb-10 mt-10">
            <a id={props?.name} href={`/juegos/${props?.slug}`} className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 duration-200 hover:shadow-[0_0px_60px_-15px_rgba(255,255,255,0.3)] ease-in-out dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">

                <Image className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-l-lg" src={"https://wpbackend.garcalia.com/wp-content/uploads/" + (`${props?.slug}.jpg` || "/")} alt={props?.name} width={1920} height={1080} />

                <div className="flex flex-col justify-between p-4 leading-normal">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                        {props?.name}
                    </h5>
                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                        Últimos mods para &quot;{props?.name}&quot;
                        <br />
                        Mods: {props?.count}
                    </p>
                </div>
            </a>
        </div>

    )
}