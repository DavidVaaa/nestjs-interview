import { Body, Controller, Get, Post } from '@nestjs/common';
import { McpService } from './mcp.service';

@Controller('mcp')
export class McpController {
  constructor(private readonly mcpService: McpService) {}

  // POST /mcp
  // Receives a request with a 'tool' name and 'input' data,
  // then delegates the handling of the prompt to the McpService.
  @Post()
  async handlePrompt(@Body() body: { tool: string; input: any }) {
    return this.mcpService.handlePrompt(body);
  }

  // GET /mcp/tools
  // Returns a list of available tool names registered in McpService.
  @Get('tools')
  getTools() {
    // Access the 'tools' object keys to list available tools
    return Object.keys(this.mcpService['tools']);
  }
}
