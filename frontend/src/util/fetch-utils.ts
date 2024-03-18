import type { Session } from "next-auth";
import { getSession } from "next-auth/react";

export async function getFetch(url: string) {
    const session: Session | null = await getSession();

    return fetch(url, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${session?.token?.accessToken}`,
            "Content-Type": "application/json",
        },
    })
    .then(res => res.json())
    .catch(err => console.log(err));
}

export async function postFetch(url: string, body: any) {
    const session: Session | null = await getSession();

    return fetch(url, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${session?.token?.accessToken}`,
            "Content-Type": "application/json"
        },
        body: body
    })
    .then(res => res.json())
    .catch(err => console.log(err));
}