import { NextResponse, NextRequest } from 'next/server'

/* ----------------------------- Lista de juegos ---------------------------- */
export async function GET() {

    let data = await (await fetch("https://strapi.garcalia.com/api/juegos?fields[0]=Titulo")).json()

    console.log(data.data)

    return NextResponse.json({
        "data": data.data
    })
}