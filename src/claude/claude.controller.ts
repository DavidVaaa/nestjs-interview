// Import necessary decorators and utilities from NestJS
import { Controller, Post, Body } from '@nestjs/common';
// Import the service responsible for communicating with Claude
import { ClaudeService } from './claude.service';

// Define a controller that handles routes prefixed with /claude
@Controller('claude')
export class ClaudeController {
  // Inject the ClaudeService into the controller
  constructor(private readonly claudeService: ClaudeService) {}

  // Define a POST endpoint at /claude/prompt
  @Post('prompt')
  async sendPromptToClaude(@Body('prompt') prompt: string) {
    // Send the provided prompt to Claude using the service
    const response = await this.claudeService.sendMcpPrompt(prompt);

    // Return the response received from Claude to the client
    return response;
  }
}
