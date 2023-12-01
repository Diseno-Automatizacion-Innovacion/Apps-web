import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export async function GET(req: NextRequest) {

    let temas = await (await fetch(`https://wpbackend.garcalia.com/index.php/wp-json/rub-forum/v1/categories`)).json()

    return NextResponse.json({
        temas
    })
}

export async function POST(req: NextRequest) {
    let data = await req.json()
    let postInfo = await axios.post("https://wpbackend.garcalia.com/index.php/wp-json/rub-forum/v1/categories", {
        "name": data.name,
        "description": data.description
    }, {
        headers: {
            Authorization: `Bearer ${data.token}`
        }
    }).catch((e) => {
        console.log(e)
    })
    console.log(postInfo)
    return NextResponse.json({
        postInfo
    })
}