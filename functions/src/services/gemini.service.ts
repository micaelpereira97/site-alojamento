import { GoogleGenerativeAI } from '@google/generative-ai';
import { defineString } from 'firebase-functions/params';

// Environment variable for Gemini API key
const geminiApiKey = defineString('GEMINI_API_KEY');

export class GeminiService {
  private genAI: GoogleGenerativeAI | null = null;
  private model: any = null;

  constructor() {
    const apiKey = geminiApiKey.value();
    if (apiKey && apiKey !== 'YOUR_GEMINI_API_KEY_HERE') {
      this.genAI = new GoogleGenerativeAI(apiKey);
      this.model = this.genAI.getGenerativeModel({ model: 'gemini-2.0-flash-exp' });
    }
  }

  async chat(message: string, context: any): Promise<string> {
    if (!this.model) {
      return 'Desculpe, o assistente está temporariamente indisponível. Por favor, tente novamente mais tarde.';
    }

    try {
      const systemInstruction = this.buildSystemInstruction(context);
      const prompt = `${systemInstruction}\n\nUser: ${message}\n\nAssistant:`;

      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      return response.text();
    } catch (error) {
      console.error('Gemini API Error:', error);
      return 'Desculpe, ocorreu um erro ao processar sua mensagem. Por favor, tente novamente.';
    }
  }

  private buildSystemInstruction(context: any): string {
    const unitsInfo = context.units?.map((unit: any) =>
      `- ${unit.name}: ${unit.description.substring(0, 100)}... | Preço: €${unit.price}/noite | Capacidade: ${unit.capacity} pessoas`
    ).join('\n') || '';

    return `Você é Flora, a assistente virtual do Recanto da Natureza, um alojamento local de luxo na natureza em Portugal.

**Sua Personalidade:**
- Calorosa, acolhedora e profissional
- Conhecedora da região da Serra da Lousã
- Apaixonada pela natureza e turismo sustentável
- Responde em português de Portugal

**Informações sobre o Alojamento:**

**Unidades Disponíveis:**
${unitsInfo}

**Serviços:**
- Pequeno-almoço regional com produtos locais
- Serviço de limpeza e conforto
- Aluguer de bicicletas para aventuras
- Massagens e wellness

**Atividades Próximas:**
- Trilhos de caminhada na Serra da Lousã
- Praia fluvial
- Aldeias históricas de xisto

**Localização:**
Serra da Lousã, Portugal

**Instruções:**
- Responda perguntas sobre as unidades, serviços, atividades e localização
- Se perguntarem sobre disponibilidade, sugira que usem o calendário no site
- Se perguntarem sobre reservas, explique o processo: escolher unidade → selecionar datas → preencher formulário
- Seja concisa mas informativa
- Use emojis ocasionalmente para ser mais amigável 🌿
- Se não souber algo, seja honesta e sugira entrar em contato direto

Responda de forma natural e útil!`;
  }
}

export const geminiService = new GeminiService();
