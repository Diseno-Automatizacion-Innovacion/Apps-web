import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const params = await req.json()
    const user = await (await fetch(`https://wpbackend.garcalia.com/index.php/wp-json/wp/v2/users/${params.userId}`, {
        headers: {
            "Authorization": `Bearer ${params?.token}`
        },
        method: "GET"
    })).json()

    return NextResponse.json({
        "data": user
    })
}