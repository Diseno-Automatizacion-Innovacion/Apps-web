import { NextResponse, NextRequest } from 'next/server'

/* ------------------------------ Lista de mods ----------------------------- */
// export async function GET() {

//     let data = await (await fetch("https://wpbackend.garcalia.com/index.php/wp-json/wp/v2/posts?_fields=slug,categories,title,content")).json()

//     return NextResponse.json({
//         "data": data.data
//     })
// }

/* ----------------------------- Lista de juegos ---------------------------- */
export async function GET() {
    let data = await (await fetch("https://wpbackend.garcalia.com/index.php/wp-json/wp/v2/categories?_fields=slug,id,count,name")).json().catch(e => { })
    for (let i = 0; i < data.length; i++) {
        if (data[i]?.id == 1) {
            // console.log(data[i])
            data.splice(i, 1)
        }
    }
    return NextResponse.json({
        "juegos": data
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