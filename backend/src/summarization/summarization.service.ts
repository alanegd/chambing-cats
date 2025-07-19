import { Injectable, InternalServerErrorException } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class SummarizationService {
  private readonly apiKey = process.env.OPENAI_API_KEY;
  private readonly apiUrl = 'https://api.openai.com/v1/chat/completions';

  async summarize(messages: string[]): Promise<string> {
    if (!this.apiKey) {
      throw new InternalServerErrorException('OpenAI API key not configured');
    }
    const prompt = `Summarize the following comments in a concise paragraph:\n${messages.join('\n')}`;
    const response = await axios.post(
      this.apiUrl,
      {
        model: 'gpt-3.5-turbo',
        messages: [
          { role: 'system', content: 'You are a helpful assistant.' },
          { role: 'user', content: prompt },
        ],
        max_tokens: 150,
      },
      {
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
        },
      },
    );
    return response.data.choices[0].message.content.trim();
  }
} 