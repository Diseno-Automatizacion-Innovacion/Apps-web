import { NextResponse, NextRequest } from 'next/server'
// import * as axios from 'axios'
import axios from 'axios'

export async function POST(req: NextRequest) {
    const { email, password } = await req.json()

    console.log(email, password)

    let res = {};

    await (
        axios.post("https://strapi.garcalia.com/api/auth/local", {
            identifier: email,
            // email: email,
            password: password
        }).then((response: any) => {
            // Handle success.
            console.log('Well done!');
            console.log('User profile', response.data.user);
            console.log('User token', response.data.jwt);

            res = { "token": response.data.jwt }
        }).catch((error: any) => {
            res = { "error": error.response.data.error.message }
        })
    )

    console.log(res)

    return NextResponse.json(res)

}