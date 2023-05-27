import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export const extractRelevantTopics = async (advice: string) => {
    try {
        const response = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            temperature: 0.7,
            max_tokens: 60,
            messages: [
                { role: "system", content: "You are a helpful assistant that extracts key topics from a text." },
                { role: "user", content: `Extract 3 key topics from this advice: "${advice}"` }
            ],
        });

        const extractedTopicsStr = response.data.choices?.[0]?.message?.content?.trim() || '';
        // Split the string into an array of topics by comma
        const extractedTopics = extractedTopicsStr.split(',').map(topic => topic.trim());
        return extractedTopics;

    } catch (error) {
        console.error('Error extracting relevant topics:', error);
        throw error;
    }
};
