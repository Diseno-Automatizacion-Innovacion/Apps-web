import { NextResponse, NextRequest } from "next/server";

export async function GET(req: NextRequest) {
    const slug = req.url.split("/")[6]
    console.log(slug)

    let retrieve = await (await fetch(`https://wpbackend.garcalia.com/index.php/wp-json/wp/v2/posts/${slug}?_fields=content`)).json()
    // console.log(retrieve)
    // console.log(retrieve)
    // let mods = retrieve.filter((post: any) => post?.slug.includes(slug))
    // console.log(mods)
    const download = retrieve?.content?.rendered.replace(/\<[A-z]+\>|\<\/[A-z]+\>/g, "").replace(/\n/g, "")
    // console.log(download)

    return NextResponse.json({
        "data": download
    })
}