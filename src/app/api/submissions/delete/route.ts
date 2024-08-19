import { PrismaClient } from "@prisma/client";

export const DELETE = async (request : Request) => {
    const data = await request.json() as {id:number};

    const prisma = new PrismaClient();
    await prisma.submission.delete({
        where: {Id:data.id},
    });
    const submissions = await prisma.submission.findMany()
    await prisma.$disconnect();

    return new Response(JSON.stringify(submissions));
};
