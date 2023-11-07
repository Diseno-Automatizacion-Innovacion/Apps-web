import { NextResponse, NextRequest } from 'next/server'
// import * as axios from 'axios'
import axios from 'axios'

export async function POST(req: NextRequest) {
    const { email, password } = await req.json()

    console.log(email, password)

    let res = {};

    await (
        axios.post("https://wpbackend.garcalia.com/index.php/wp-json/jwt-auth/v1/token", {
            username: email,
            // email: email,
            password: password
        }).then((response: any) => {
            console.log(response.data.data.token)
            res = { "token": response.data.data.token }
        }).catch((error: any) => {
            res = { "error": error?.response?.data?.error?.message }
        })
    )

    console.log(res)

    return NextResponse.json(res)

}