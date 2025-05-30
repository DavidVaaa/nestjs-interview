import { Injectable } from '@nestjs/common';
import { TodoItemsService } from '../todo_items/todo_items.service';
import { createTools } from './tools';
import { ClaudeService } from 'src/claude/claude.service';

@Injectable()
export class McpService {
  private tools: any;

  constructor(
    private readonly todoItemsService: TodoItemsService,
    private readonly claudeService: ClaudeService,
  ) {
    this.tools = createTools(this.todoItemsService, this.claudeService);
  }

  async handlePrompt({
    tool,
    input,
  }: {
    tool: string;
    input: any;
  }): Promise<any> {
    const selectedTool = this.tools[tool];
    if (!selectedTool) {
      throw new Error(`Herramienta desconocida: ${tool}`);
    }

    return await selectedTool.handler(input);
  }
}
