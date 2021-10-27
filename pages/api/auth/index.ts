import prisma from "@lib/prisma";
import { useSession } from "next-auth/react";
import router from "next/router";
import { NextApiRequest, NextApiResponse } from 'next';

//POST /api/auth
// For signup...

export default async function handle(req: NextApiRequest, res: NextApiResponse){

    const session  = useSession();

    const {
        name,
        email,
        password
    } = req.body;

    if (session.status === "authenticated") {
        router.push('/');
        return;
    }

    const result = await prisma.user.create({
        data: {
            name: name,
            email: email,
            password: password
        }
    });
    res.json(result);
}