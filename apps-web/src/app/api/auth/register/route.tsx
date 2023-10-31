import { NextResponse, NextRequest } from 'next/server'
import axios from 'axios'

export async function POST(req: NextRequest) {
    const { user, email, password } = await req.json()
    console.log(user, email, password)
    try {
        const data = await axios.post("https://strapi.garcalia.com/api/auth/local/register", {
            username: "buenas",
            password: "buenas",
            email: "a@a.com"
        })
    }

    // console.log(data.data.jwt)
    return NextResponse.json({
        "token": data.data.jwt
    })
}