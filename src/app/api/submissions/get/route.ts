import { PrismaClient } from "@prisma/client";

export const GET = async () => {
  const prisma = new PrismaClient();
  const submission: any[] = await prisma.submission.findMany({
  });
  await prisma.$disconnect();
  const turkishSort = (a: any, b: any) => {
    return a.Name.localeCompare(b.Name, 'tr', { sensitivity: 'base' });
  };
  submission.sort(turkishSort);
  return new Response(JSON.stringify(submission));
};
