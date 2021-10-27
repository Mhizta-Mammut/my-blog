import prisma from "@lib/prisma";
import { useSession } from "next-auth/react";
import router from "next/router";

//POST /api/auth
// For signup...

export default async function handle(req, res){

    const { data: session } = useSession();
    const {
        name,
        email,
        password
    } = req.body;

    if (session) {
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