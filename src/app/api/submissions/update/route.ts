import { PrismaClient } from "@prisma/client";

export const PUT = async (request: Request) => {
    const data = await request.json();
    const prisma = new PrismaClient();
    const updatedSubmission = await prisma.submission.update({
        where: {
            // Use either Id or Email depending on what you have available
            Id: data.Id,
            // Or use Email if you don't have the Id
            // Email: yourEmail
        },
        data: {
            Name: data.Name,
            Surname: data.Surname,
            Email: data.Email,
            PhoneNumber: data.PhoneNumber,
        },
    });

        const submissions = await prisma.submission.findMany();
        await prisma.$disconnect();
        return new Response(JSON.stringify(submissions));
};
