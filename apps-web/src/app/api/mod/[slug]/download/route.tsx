import { NextResponse, NextRequest } from "next/server";

export async function GET(req: NextRequest) {
    const slug = req.url.split("/")[3]

    let retrieve = await (await fetch(`https://wpbackend.garcalia.com/index.php/wp-json/wp/v2/posts/${slug}?_fields=content`)).json()
    // console.log(retrieve)
    // let mods = retrieve.filter((post: any) => post?.slug.includes(slug))
    // console.log(mods)
    const download = retrieve?.content

    return NextResponse.json({
        "data": download
    })
}