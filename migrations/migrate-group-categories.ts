import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function migrateGroupCategories() {
  try {
    // Get all groups
    const groups = await prisma.group.findMany({
      where: {
        category: { not: null }
      }
    });
    
    for (const group of groups) {
      if (!group.category) continue;
      
      // Create or find category
      const categoryRef = await prisma.category.upsert({
        where: { name: group.category },
        create: { name: group.category },
        update: {},
      });
      
      // Update group with new categoryId
      await prisma.group.update({
        where: { id: group.id },
        data: { categoryId: categoryRef.id },
      });
    }
    
    console.log('Migration completed successfully');
  } catch (error) {
    console.error('Migration failed:', error);
  } finally {
    await prisma.$disconnect();
  }
}

migrateGroupCategories(); 