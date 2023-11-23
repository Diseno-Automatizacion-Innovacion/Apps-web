import { NextRequest, NextResponse } from "next/server";
import axios, { AxiosError, AxiosResponse } from "axios";

export async function POST(req: NextRequest) {
    const id = req.url.split("/")[5]
    const { comment, postId, token } = await req.json()

    const data = await axios.post("https://wpbackend.garcalia.com/index.php/wp-json/wp/v2/comments", {
        "content": comment,
        "post": postId,
        "status": "approve"
    }, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    }).catch((e: AxiosError) => console.log(e.cause))

    const response = (data as any).data

    return NextResponse.json({
        response
    })

}