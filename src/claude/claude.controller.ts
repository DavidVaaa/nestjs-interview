import { Controller, Post, Body } from '@nestjs/common';
import { ClaudeService } from './claude.service';

@Controller('claude')
export class ClaudeController {
  constructor(private readonly claudeService: ClaudeService) {}

  @Post('prompt')
  async sendPromptToClaude(@Body('prompt') prompt: string) {
    const response = await this.claudeService.sendMcpPrompt(prompt);
    return response;
  }
}
