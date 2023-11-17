import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const params = await req.json()
    const user = await (await fetch(`https://wpbackend.garcalia.com/index.php/wp-json/v2/users/${params.userId}`, {
        headers: {
            "Authorization": `Bearer ${params?.token}`
        }
    })).json()

    // console.log()

    return NextResponse.json({
        "data": user
    })
}