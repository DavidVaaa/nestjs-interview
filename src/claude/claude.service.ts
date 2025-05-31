// Import necessary NestJS decorators and modules
import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios'; // Used to make HTTP requests
import { ConfigService } from '@nestjs/config'; // Used to access environment variables
import { firstValueFrom } from 'rxjs'; // Converts an Observable to a Promise

@Injectable()
export class ClaudeService {
  private readonly apiKey: string;

  constructor(
    private readonly httpService: HttpService,      // Inject HttpService to make API calls
    private readonly configService: ConfigService   // Inject ConfigService to access environment variables
  ) {
    // Retrieve the Claude API key from environment variables
    this.apiKey = this.configService.get<string>('CLAUDE_API_KEY');

    // Throw an error if the API key is missing
    if (!this.apiKey) {
      throw new Error('CLAUDE_API_KEY is not configured');
    }
  }

  // Sends a prompt to the Claude API and returns the response
  async sendMcpPrompt(prompt: string): Promise<any> {
    const url = 'https://api.anthropic.com/v1/messages';

    // Prepare the request body following the Claude API structure
    const data = {
      model: 'claude-3-haiku-20240307', // Claude model to use
      max_tokens: 1000,                 // Limit on response length
      tools: [],                        // No tools used in this basic request
      messages: [
        {
          role: 'user',
          content: prompt,              // The actual prompt to send
        },
      ],
    };

    // Set required headers for Claude API
    const headers = {
      'x-api-key': this.apiKey,
      'anthropic-version': '2023-06-01',
      'content-type': 'application/json',
    };

    try {
      // Send the HTTP POST request and return the result
      const response = await firstValueFrom(
        this.httpService.post(url, data, { headers })
      );
      return response.data;
    } catch (error) {
      // Log and rethrow the error if the request fails
      console.error('Error calling Claude:', error.response?.data || error.message);
      throw error;
    }
  }
}
