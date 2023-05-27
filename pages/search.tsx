import axios from 'axios';

export async function searchTopics(topics: string[]) {
  const searchResults = []; 

  for (const topic of topics) {
    try {
      const response = await axios.get(`https://www.googleapis.com/customsearch/v1`, {
        params: {
          key: 'AIzaSyB1NEXcMVl19HfU-WqcZNeGqMnXn1xgDao',
          cx: '476a87d3f5e864ad3',
          q: topic
        }
      });

      searchResults.push(response.data.items);
    } catch (error) {
      console.error(`Error searching for topic ${topic}:`, error);
    }
  }

  return searchResults;
}
