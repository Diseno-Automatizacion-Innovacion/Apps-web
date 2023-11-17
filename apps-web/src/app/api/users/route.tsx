import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {

    const users = await (await fetch("https://wpbackend.garcalia.com/index.php/wp-json/v2"))

    return NextResponse.json({
        "data": users
    })
}