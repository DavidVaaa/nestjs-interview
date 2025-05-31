import { Injectable } from '@nestjs/common';
import { TodoItemsService } from '../todo_items/todo_items.service';
import { createTools } from './tools';
import { ClaudeService } from 'src/claude/claude.service';

@Injectable()
export class McpService {
  private tools: any;

  constructor(
    private readonly todoItemsService: TodoItemsService, // Service to manage todo items
    private readonly claudeService: ClaudeService,       // Service to interact with Claude AI
  ) {
    // Initialize available tools by passing required services
    this.tools = createTools(this.todoItemsService, this.claudeService);
  }

  // Handles a prompt by delegating to the appropriate tool handler
  async handlePrompt({
    tool,
    input,
  }: {
    tool: string; // Name of the tool to use
    input: any;   // Input data for the tool
  }): Promise<any> {
    const selectedTool = this.tools[tool];

    // Throw an error if the requested tool does not exist
    if (!selectedTool) {
      throw new Error(`Unknown tool: ${tool}`);
    }

    // Call the handler function of the selected tool with the input and return its result
    return await selectedTool.handler(input);
  }
}
