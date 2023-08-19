import { PrismaClient } from '@prisma/client';

declare global {
  var prisma: PrismaClient | undefined;
}

const client = globalThis.prisma || new PrismaClient();
// below line is to avoid creating multiple instance of prisma client due to HMR of nextjs
if (process.env.NODE_ENV !== 'production') globalThis.prisma = client;

export default client;
