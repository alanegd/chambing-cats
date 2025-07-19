export const analysisService = {
  getPostSummary: async (postId: string): Promise<string> => {
    console.log(`Fetching AI summary for post ${postId}...`);
    await new Promise(res => setTimeout(res, 800)); // Simular retraso de red
    return "En general, la recepción de este post ha sido excepcional. Los usuarios destacan la alta calidad de la imagen y el tono inspirador del mensaje. Aunque algunos comentarios son neutrales, la gran mayoría expresa una fuerte satisfacción y sentimiento positivo.";
  },

  getCommentSentiments: async (commentIds: string[]): Promise<Record<string, 'satisfied' | 'unsatisfied' | 'neutral'>> => {
    console.log(`Fetching sentiments for ${commentIds.length} comments...`);
    await new Promise(res => setTimeout(res, 500));
    const sentiments: Record<string, 'satisfied' | 'unsatisfied' | 'neutral'> = {};
    commentIds.forEach((id, index) => {
      if (index % 5 === 0) sentiments[id] = 'unsatisfied';
      else if (index % 3 === 0) sentiments[id] = 'neutral';
      else sentiments[id] = 'satisfied';
    });
    return sentiments;
  },
  
  getPostTrends: async (postId: string): Promise<string[]> => {
    console.log(`Fetching trends for post ${postId}...`);
    await new Promise(res => setTimeout(res, 600));
    return ["#Productividad", "#DiseñoCreativo", "#MarketingDigital", "#Tech", "#InspiraciónDiaria"];
  }
};