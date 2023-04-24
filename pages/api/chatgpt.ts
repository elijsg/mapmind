import { NextApiRequest, NextApiResponse } from "next";
import { OpenAIApi, Configuration } from "openai";

const openai = new OpenAIApi(new Configuration({ apiKey: process.env.OPENAI_API_KEY }));

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const answers = req.body.answers;
    console.log("Received answers in API:", answers);

    // Construct the prompt using the user's answers
    const prompt = `Generate a personalized plan for the user based on their answers:
Occupation and satisfaction: ${answers[0]}
Work-life balance: ${answers[1]}
Physical activity: ${answers[2]}
Financial stability: ${answers[3]}
Major life changes: ${answers[4]}
Personal goals: ${answers[5]}
Personal relationships: ${answers[6]}
Challenges and obstacles: ${answers[7]}
Professional help and guidance: ${answers[8]}
Time dedicated to improvement: ${answers[9]}
`;

    const axiosResponse = await openai.createCompletion({
      model: "text-davinci-002",
      prompt: prompt,
      max_tokens: 150,
      n: 1,
      stop: null,
      temperature: 0.5,
    });

    if (
      axiosResponse.data.choices &&
      axiosResponse.data.choices.length > 0 &&
      axiosResponse.data.choices[0].text
    ) {
      const completion = axiosResponse.data.choices[0].text.trim();
      res.status(200).json({ answer: completion });
    } else {
      res.status(200).json({ answer: "No response was generated." });
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}