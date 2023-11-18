import { NextResponse, NextRequest } from "next/server";

export async function GET(req: NextRequest) {
    const slug = req.url.split("/")[5]
    console.log(slug)

    let retrieve = await (await fetch(`https://wpbackend.garcalia.com/index.php/wp-json/wp/v2/posts?_fields=slug,title,author,excerpt,categories,id`)).json()
    // console.log(retrieve)
    let mods = retrieve.filter((post: any) => post?.slug.includes(slug))
    // console.log(mods)

    return NextResponse.json({
        "data": mods[0]
    })
}