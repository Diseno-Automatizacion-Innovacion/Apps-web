import { NextResponse, NextRequest } from 'next/server'
// import * as axios from 'axios'
import axios, { AxiosError } from 'axios'

export async function POST(req: NextRequest) {
    const { user, email, password } = await req.json()

    // console.log(user, email, password)

    let res2 = {};

    await (
        axios.post("https://wpbackend.garcalia.com/index.php/wp-json/wp/v2/users", {
            username: user,
            email: email,
            password: password
        }, {
            headers: {
                "Authorization": `basic ${Buffer.from("rugarcal@hotmail.com:0Euo TsPz Fc7A 8KaC joIc Pjix").toString("base64")}`
            }
        }).then((response: any) => {
            // Handle success.
            // console.log(response.statusText);


            res2 = { "statusText": response.statusText }
        }).catch((error: any) => {
            // console.log("A")
            res2 = { "error": error.response?.data?.message }
        })
    )

    // console.log(res2)

    return NextResponse.json(res2)

}