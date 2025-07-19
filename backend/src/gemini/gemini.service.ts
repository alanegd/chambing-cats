import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { GoogleGenerativeAI } from '@google/generative-ai';

@Injectable()
export class GeminiService {
  private genAI: GoogleGenerativeAI;
  private model: any;

  constructor() {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new InternalServerErrorException('GEMINI_API_KEY no está configurado');
    }
    
    this.genAI = new GoogleGenerativeAI(apiKey);
    this.model = this.genAI.getGenerativeModel({ model: 'gemini-pro' });
  }

  async summarizeComments(messages: string[]): Promise<string> {
    try {
      const prompt = `Resume los siguientes comentarios en un párrafo conciso y coherente en español. Mantén el tono y los puntos principales de los comentarios:

${messages.join('\n')}

Resumen:`;

      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      return response.text().trim();
    } catch (error) {
      throw new InternalServerErrorException(`Error al generar resumen con Gemini: ${error.message}`);
    }
  }
} 