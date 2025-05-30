import { Body, Controller, Get, Post } from '@nestjs/common';
import { McpService } from './mcp.service';

@Controller('mcp')
export class McpController {
  constructor(private readonly mcpService: McpService) {}

  @Post()
  async handlePrompt(@Body() body: { tool: string; input: any }) {
    return this.mcpService.handlePrompt(body);
  }

  @Get('tools')
  getTools() {
    return Object.keys(this.mcpService['tools']);
  }
}
