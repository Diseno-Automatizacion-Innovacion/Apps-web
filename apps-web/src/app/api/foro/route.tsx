import { NextRequest, NextResponse } from "next/server";
import axios from "axios";


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
    return NextResponse.json({
        postInfo
    })
}