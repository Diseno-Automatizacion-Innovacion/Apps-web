import { NextResponse, NextRequest } from "next/server";
import axios from "axios";

// const fechaGMT = "2023-11-23T15:36:09";
// console.log(obtenerFechaFormateada(fechaGMT));


export async function GET(req: NextRequest) {
    const postId = req.url.split("/")[5] // Por probar un 5 a ver que tal
    const page = req.url.split("/")[6]

    console.log(postId, page)

    const data = await (await fetch(`https://wpbackend.garcalia.com/index.php/wp-json/wp/v2/comments?post=${postId}&page=${page}&per_page=100`)).json()

    console.log(data)

    return NextResponse.json({
        data
    })
}