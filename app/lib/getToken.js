import prisma from "@/prisma";

const getToken = async (userId) => {
    const account = await prisma.account.findFirst({
        where: {
            userId: userId
        },
    });
    const { access_token, refresh_token } = account
    return {
        access_token: access_token,
        refresh_token: refresh_token
    };
}

export {getToken}