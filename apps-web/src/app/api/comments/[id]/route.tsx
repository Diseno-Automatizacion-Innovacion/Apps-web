import { NextRequest, NextResponse } from "next/server";
import axios, { AxiosError, AxiosResponse } from "axios";

export async function POST(req: NextRequest) {
    const id = req.url.split("/")[5]
    const { comment, postId, token } = await req.json()

    console.log(comment, postId, token)

    let error = {} as any
    let response = {} as any
    await (axios.post("https://wpbackend.garcalia.com/index.php/wp-json/wp/v2/comments", {
        "content": comment,
        "post": postId,
        "status": "approve"
    }, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    }).then(d => {
        response = d
        console.log(d)
    }).catch((e: AxiosError) => {
        error = e

    }))

    console.log(response.data, error)

    if (Object.keys(error).length > 0) {
        return NextResponse.json({
            "error": error.response.data.message
        })
    }

    return NextResponse.json(
        response.data
    )

}