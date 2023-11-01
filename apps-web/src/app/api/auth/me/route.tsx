import { NextResponse, NextRequest } from "next/server";
import axios from "axios";

export async function POST(req: NextRequest) {
    const { token } = await req.json() as any
    // console.log(reqData)
    try {
        const { data } = await axios.get("https://strapi.garcalia.com/api/users/me", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return NextResponse.json({
            "user": data
        })
    }
    catch {
        return NextResponse.json({
            "error": "Nope"
        })
    }


}