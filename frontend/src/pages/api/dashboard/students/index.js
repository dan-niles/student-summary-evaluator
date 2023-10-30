import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const jsonParser = (data) => {
	return JSON.parse(
		JSON.stringify(data, (key, value) =>
			typeof value === "bigint" ? value.toString() : value
		)
	);
};

export default async function handler(req, res) {
    if (req.method === "GET") {
      try {
        // Fetch the total number of students from the eval_students table
        const totalStudents = await prisma.eval_students.count();
  
        // Return the total number of students in the response
        res.status(200).json({ totalStudents });
      } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Failed to load data" });
      }
    }
  }
