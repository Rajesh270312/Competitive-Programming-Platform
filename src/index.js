const app = require('./app');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const PORT = process.env.PORT || 3000;

async function startServer() {
  try {
    await prisma.$connect();
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server', error);
    process.exit(1);
  }
}

startServer();
