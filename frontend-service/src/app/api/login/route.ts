import { serialize } from "cookie";
import { NextResponse } from "next/server";


export async function POST (req: Request) {
    try {
        const { email, password } = await req.json();

        const response = await fetch('http://localhost:3000/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password }),
        });

        if (response.ok) {
            const data = await response.json();
            const { access_token, refresh_token } = data;

            const accessTokenCookie = serialize('access_token', access_token, {
                httpOnly: true,
                maxAge: 60 * 15,
                path: "/",
                sameSite: 'strict'
            });

            const refreshTokenCookie = serialize('refresh_token', refresh_token, {
                httpOnly: true,
                maxAge: 60 * 60 * 24 * 7,
                path: "/",
                sameSite: 'strict'
            });

            const responseHeaders = new Headers();
            responseHeaders.append('Set-Cookie', accessTokenCookie);
            responseHeaders.append('Set-Cookie', refreshTokenCookie);

            return NextResponse.json(
                { message: 'Login bem sucedido' },
                { headers: responseHeaders }
            );
        } else {
            const errorData = await response.json();
            return NextResponse.json(
                { message: errorData.message || 'Erro no Login' },
                { status: response.status }
            )
        }
    } catch (error) {
        console.error('Erro ao se conectar a API', error);
        return NextResponse.json(
            { message: 'Erro ao se conectar a a API.' },
            { status: 500 }
        )
    }
}