// import { useRouter } from 'next/router';
import { auth } from "@/app/auth";
import prisma from "@/prisma";
import { redirect } from "next/navigation";
import getSession from "@/app/lib/getSession";

const  Page = async ({params}) => {
    // const navigation = useRouter();
    // const { id } = navigation.query;
    const session = await getSession();
    if (!session) {
        redirect("/api/auth/signin");
    }
    const user = await prisma.user.findUnique({
        where:{
            id: params.id
        }
    })
    return (
        <div>
            <h1>User: {user.name}</h1>
            <p>Email: {user.email}</p>
        </div>
    );
}

export default Page;