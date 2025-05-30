import { TodoItemsService } from '../todo_items/todo_items.service';
import { ClaudeService } from '../claude/claude.service';
import { createItemTool } from './tools/create_item';
import { completeItemTool } from './tools/complete_item';

export function createTools(
  todoItemsService: TodoItemsService,
  claudeService: ClaudeService,
) {
  return {
    create_item: createItemTool(todoItemsService),
    complete_item: completeItemTool(todoItemsService),

    // Herramienta personalizada que usa Claude
    claude: {
      description: 'Envía un prompt libre a Claude y devuelve su respuesta.',
      parameters: {
        type: 'object',
        properties: {
          prompt: { type: 'string', description: 'Texto para enviar a Claude' },
        },
        required: ['prompt'],
      },
      handler: async (input: { prompt: string }) => {
        return await claudeService.sendMcpPrompt(input.prompt);
      },
    },
  };
}
