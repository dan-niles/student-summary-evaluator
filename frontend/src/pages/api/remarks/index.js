import { Configuration, OpenAIApi } from "openai-edge";

export const runtime = "edge";

const config = new Configuration({
	apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(config);

export default async function handler(req, res) {
	if (req.method === "POST") {
		try {
			const question = req.body.question;
			const text = req.body.text;
			const summary = req.body.summary;

			const prompt = {
				role: "system",
				content: `I will provide you with a large text block and a question. I will also provide you with a summary of the large of the text block which was done based on the question. I want you to suggest improvements to the summary that can be done based on content and wording. Give your response as bullet points. Keep them short an easy to understand. Generate 5 bullet points maximum. Do not generate more than 5 bullet points.
                I have labelled the question as [QUESTION] and the large text block inside a [CONTENT START] and [CONTENT END] tags. Similarly the summary is provided inside of [SUMMARY START] and [SUMMARY END] tags.
                
                [QUESTION]: ${question}
    
                [CONTENT START] 
                ${text} 
                [CONTENT END]
    
                [SUMMARY START]
                ${summary}
                [SUMMARY END]
            `,
			};

			const response = await openai.createChatCompletion({
				model: "gpt-3.5-turbo",
				messages: [prompt],
			});

			console.log(response);

			res.status(200).json({ result: response });
		} catch (err) {
			console.log(err);
			// res.status(500).json({ error: "failed to load data" });
		}
	}
}
