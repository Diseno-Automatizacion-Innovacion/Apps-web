import { NextResponse, NextRequest } from 'next/server'
// import * as axios from 'axios'
import axios from 'axios'

export async function POST(req: NextRequest) {
    const { user, email, password } = await req.json()

    console.log(user, email, password)

    let res = {};

    await (
        axios.post("https://strapi.garcalia.com/api/auth/local/register", {
            username: user,
            email: email,
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