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
			const assignments = await prisma.eval_assignments.findMany();
			res.status(200).json({ assignments: jsonParser(assignments) });
		} catch (err) {
			console.log(err);
			res.status(500).json({ error: "failed to load data" });
		}
	}
}
