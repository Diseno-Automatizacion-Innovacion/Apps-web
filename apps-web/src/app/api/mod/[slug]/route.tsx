import { NextResponse, NextRequest } from "next/server";
import axios, { AxiosError } from "axios";

export async function GET(req: NextRequest) {
    const slug = req.url.split("/")[5]
    console.log(slug)

    let retrieve = await (await fetch(`https://wpbackend.garcalia.com/index.php/wp-json/wp/v2/posts?_fields=slug,title,author,excerpt,categories,id`)).json()
    // console.log(retrieve)
    let mods = retrieve.filter((post: any) => post?.slug == slug)
    // console.log(mods)

    return NextResponse.json({
        "data": mods[0]
    })
}

export async function POST(req: NextRequest) {
    const slug = req.url.split("/")[5]
    console.log(slug)
    const props = await req.json()
    let categorie

    let categories = await (await fetch("https://wpbackend.garcalia.com/index.php/wp-json/wp/v2/categories?_fields=slug,id,count,name,description")).json().catch(e => { })
    for (let i = 0; i < categories.length; i++) {
        if (categories[i]?.slug == slug) {
            categorie = categories[i]?.id
            break
        }
    }



    let toReturn = await axios.post("https://wpbackend.garcalia.com/index.php/wp-json/wp/v2/posts", {
        "title": props?.title,
        "content": props?.file,
        "excerpt": props?.description,
        "categories": [categorie],
        "status": "publish"
    }, {
        headers: {
            "Authorization": `Bearer ${props?.token}`
        }
    }).catch(e => { })

    console.log((toReturn as any).data)
    let a = (toReturn as any).data

    return NextResponse.json({
        a
    })
}