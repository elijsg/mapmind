import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export const extractRelevantTopics = async (advice: string) => {
    try {
      const response = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        temperature: 0.9,
        max_tokens: 60,
        messages: [
          { role: "system", content: "You are a helpful assistant that extracts key topics from a text." },
          { role: "system", content: "Your goal is to provide a google search API with 3 searchable topics." },
          { role: "user", content: `Extract 1 key topic from each of the 3 main areas identified from this advice and put them in a list for the google search: "${advice}". Please have the only text in your response be the topics.` }
        ],
      });
  
      const extractedTopicsStr = response.data.choices?.[0]?.message?.content?.trim() || '';
  
      const extractedTopics = extractedTopicsStr.split('\n').map(topic => topic.trim()).filter(topic => topic.length > 0);
  
      return extractedTopics;
  
    } catch (error) {
      console.error('Error extracting relevant topics:', error);
      throw error
    }
};
