import { NextRequest, NextResponse } from "next/server";
import axios, { AxiosError, AxiosResponse } from "axios";

export async function POST(req: NextRequest) {
    const id = req.url.split("/")[5]
    const { comment, postId, token } = await req.json()

    console.log(comment, postId, token)

    let error = {} as any
    const data = await axios.post("https://wpbackend.garcalia.com/index.php/wp-json/wp/v2/comments", {
        "content": comment,
        "post": postId,
        "status": "approve"
    }, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    }).catch((e: AxiosError) => {
        error = e
        console.log(e.cause, e)
    })

    const response = (data as any).data
    if (error) {
        return NextResponse.json({
            error
        })
    }
    else
        return NextResponse.json({
            response
        })

}