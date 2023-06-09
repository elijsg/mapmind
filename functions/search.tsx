import axios from 'axios';

export async function searchTopics(topics: string[]) {
  const searchResults: string[] = []; 

  for (const topic of topics) {
    console.log(`Searching for topic: ${topic}`); 

    try {
      const response = await axios.get(`https://www.googleapis.com/customsearch/v1`, {
        params: {
          key: process.env.NEXT_PUBLIC_GOOGLE_API_KEY,
          cx: '476a87d3f5e864ad3',
          q: topic,
          num: 1 ,
          dateRestrict: '2y',
        }
      });

      if (response.data.items && response.data.items.length > 0) {
        const item = response.data.items[0]; 
        searchResults.push(`${item.title}\n${item.link}`);
      }

    } catch (error) {
      console.error(`Error searching for topic ${topic}:`, error);
    }
  }

  return searchResults;
}
