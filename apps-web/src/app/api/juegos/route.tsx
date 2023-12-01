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
    let categoryId = 0
    let description = ""

    let categories = await (await fetch("https://wpbackend.garcalia.com/index.php/wp-json/wp/v2/categories?_fields=slug,id,count,name,description")).json().catch(e => { })
    for (let i = 0; i < categories.length; i++) {
        if (categories[i]?.slug == slug) {
            categoryId = categories[i]?.id
            description = categories[i]?.description
            break
        }
    }

    let retrieve = await (await fetch(`https://wpbackend.garcalia.com/index.php/wp-json/wp/v2/posts?_fields=slug,title,author,excerpt,categories`)).json()
    // console.log(retrieve)
    let mods = retrieve.filter((post: any) => post?.categories.includes(categoryId))

    console.log(mods)

    return NextResponse.json({
        "data": { "mods": mods, "descripcion": description }
    })

}