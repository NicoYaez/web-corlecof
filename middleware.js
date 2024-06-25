import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(request) {

    const jwt = request.cookies.get('token')?.value
    const api = process.env.NEXT_PUBLIC_API_LINK

    if (request.nextUrl.pathname === '/') {
        if (jwt !== undefined) {
            try {
                //Verificar Token
                if (res.status === 200) {
                    return NextResponse.redirect(new URL('/dashboard/secretary', request.url))
                }
            } catch (error) {
                console.error(error)
                return NextResponse.redirect(new URL('/auth/login', request.url))            }
        }
        return NextResponse.redirect(new URL('/auth/login', request.url))
    }

    if (request.nextUrl.pathname.startsWith('/auth/login')) {
        if (jwt !== undefined) {
            try {
                const decoded = await jwtVerify(jwt, new TextEncoder().encode(process.env.SECRET_API))

                const { id } = decoded.payload

                const res = await fetch(`${api}/api/v1/verify/${id}`, {
                    headers: {
                        Authorization: `Bearer ${jwt}`,
                    },
                })

                //Verificar Token
                if (res.status === 200) {
                    return NextResponse.redirect(new URL('/dashboard/secretary', request.url))
                }
            } catch (error) {
                console.error(error)
            }
        }
        return NextResponse.next()
    }

    if (request.nextUrl.pathname.startsWith('/change-password')) {

        console.log('verificacion change-password')

        if (jwt !== undefined) {
            try {
                const decoded = await jwtVerify(jwt, new TextEncoder().encode(process.env.SECRET_API))

                const { serial, id, role } = decoded.payload

                const res = await fetch(`${api}/api/v1/verify/${id}`, {
                    headers: {
                        Authorization: `Bearer ${jwt}`,
                    },
                })

                //Verificar Token
                if (res.status !== 200) {
                    return NextResponse.redirect(new URL('/login', request.url))
                }

                console.log('verifiacion correcta')
                return NextResponse.next()

            } catch (error) {
                console.error(error)
            }
        }
        return NextResponse.redirect(new URL('/login', request.url))
    }

}