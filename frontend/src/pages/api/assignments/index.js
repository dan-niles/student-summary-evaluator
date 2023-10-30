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
			const assignments = await prisma.eval_assignments.findMany({
				include: {
					eval_text: true,
				},
			});
			res.status(200).json({ assignments: jsonParser(assignments) });
		} catch (err) {
			console.log(err);
			res.status(500).json({ error: "failed to load data" });
		}
	} else if (req.method === "POST") {
		try {
			const text = await prisma.eval_text.create({
				data: {
					title: req.body.title,
					text: req.body.text,
				},
			});
			const assignment = await prisma.eval_assignments.create({
				data: {
					question: req.body.question,
					deadline: req.body.deadline,
					createdBy_id: req.body.user_id,
					textTitle_id: text.id,
				},
			});
			res
				.status(200)
				.json({ assignment: jsonParser(assignment), text: jsonParser(text) });
		} catch (err) {
			console.log(err);
			res.status(500).json({ error: "failed to load data" });
		}
	}
}
