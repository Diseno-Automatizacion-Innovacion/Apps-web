import { NextResponse, NextRequest } from 'next/server'

/* ----------------------------- Lista de juegos ---------------------------- */
export async function GET() {

    let data = await (await fetch("https://strapi.garcalia.com/api/juegos?fields[0]=Titulo&fields[2]=slug")).json()

    console.log(data.data)

    return NextResponse.json({
        "data": data.data
    })
}

export async function POST(req: NextRequest) {
    const data = await req.json()

    const slug = data.query


    let retrieve = await (await fetch(`https://strapi.garcalia.com/api/juegos?filters[slug][$eq]=${slug}&populate=*`)).json()


    return NextResponse.json({
        "data": retrieve.data
    })

}