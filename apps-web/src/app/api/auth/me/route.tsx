import { NextResponse, NextRequest } from "next/server";
import axios from "axios";

export async function POST(req: NextRequest) {
    const { token } = await req.json() as any
    // console.log(reqData)
    try {

        const { data } = await axios.get("https://wpbackend.garcalia.com/index.php/wp-json/wp/v2/users/me", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        console.log(data)
        return NextResponse.json({
            "user": data
        })
    }
    catch (e) {

        return NextResponse.json({
            "error": "Nope"
        })
    }


}