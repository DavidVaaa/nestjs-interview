import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class ClaudeService {
  private readonly apiKey: string;

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService
  ) {
    this.apiKey = this.configService.get<string>('CLAUDE_API_KEY');
    if (!this.apiKey) {
      throw new Error('CLAUDE_API_KEY no está configurada');
    }
  }

  async sendMcpPrompt(prompt: string): Promise<any> {
    const url = 'https://api.anthropic.com/v1/messages';

    const data = {
      model: 'claude-3-haiku-20240307',
      max_tokens: 1000,
      tools: [], // Aquí luego irán tus herramientas
      messages: [
        {
          role: 'user',
          content: prompt,
        },
      ],
    };

    const headers = {
      'x-api-key': this.apiKey,
      'anthropic-version': '2023-06-01',
      'content-type': 'application/json',
    };

    try {
      const response = await firstValueFrom(
        this.httpService.post(url, data, { headers })
      );
      return response.data;
    } catch (error) {
      console.error('Error llamando a Claude:', error.response?.data || error.message);
      throw error;
    }
  }
}
