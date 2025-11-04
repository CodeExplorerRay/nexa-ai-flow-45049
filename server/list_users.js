const { PrismaClient } = require('@prisma/client');
(async () => {
  try {
    const prisma = new PrismaClient();
    const users = await prisma.user.findMany({ select: { id: true, email: true, username: true, name: true, password_hash: true } });
    console.log('users:', users);
    await prisma.$disconnect();
  } catch (e) {
    console.error('ERROR listing users', e);
    process.exit(1);
  }
})();
