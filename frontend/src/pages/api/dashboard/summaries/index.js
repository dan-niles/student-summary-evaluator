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
			const summaries = await prisma.eval_summaries.findMany();
			res.status(200).json({ summaries: jsonParser(summaries) });
		} catch (err) {
			console.log(err);
			res.status(500).json({ error: "failed to load data" });
		}
	}
}
