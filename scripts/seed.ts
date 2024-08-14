//discussed in 3:25:00 in video tutorial
// shutdown app with cntrl+c and the write command node scripts/seed.ts

const { PrismaClient } = require("@prisma/client");

const database = new PrismaClient();

async function main() {
  try {
    await database.category.createMany({
      data:[
          { name: "Computer Science" },
          { name: "Music" },
          { name: "Fitness" },
          { name: "Photography" },
          { name: "Accounting" },
          { name: "Engineering" },
          { name: "Filming" },
          { name: "Mathematics" },
          { name: "Physics" },
          { name: "Chemistry" },
          { name: "Biology" },
          { name: "Literature" },
          { name: "History" },
          { name: "Psychology" },
          { name: "Philosophy" },
          { name: "Economics" },
          { name: "Political Science" },
          { name: "Sociology" },
          { name: "Environmental Science" },
          { name: "Art History" },
          { name: "Graphic Design" },
          { name: "Web Development" },
          { name: "Cybersecurity" },
          { name: "Data Science" },
          { name: "Artificial Intelligence" },
          { name: "Culinary Arts" },
          { name: "Fashion Design" },
      ]
    });

    console.log("Success");
  } catch (error) {
    console.log("Error seeding the database categories", error);
  } finally {
    await database.$disconnect();
  }
}

main();