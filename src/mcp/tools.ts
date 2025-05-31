import { TodoItemsService } from '../todo_items/todo_items.service';
import { ClaudeService } from '../claude/claude.service';
import { createItemTool } from './tools/create_item';
import { completeItemTool } from './tools/complete_item';

/**
 * Factory function to create available tools with their handlers.
 * Each tool is an object with a description, parameters schema, and a handler function.
 *
 * param todoItemsService - Service for managing todo items
 * param claudeService - Service for interacting with Claude AI
 * returns - An object mapping tool names to tool implementations
 */
export function createTools(
  todoItemsService: TodoItemsService,
  claudeService: ClaudeService,
) {
  return {
    // Tool to create a new todo item
    create_item: createItemTool(todoItemsService),

    // Tool to mark a todo item as complete
    complete_item: completeItemTool(todoItemsService),

    // Custom tool that sends a free-form prompt to Claude and returns its response
    claude: {
      description: 'Sends a free-form prompt to Claude and returns the response.',
      parameters: {
        type: 'object',
        properties: {
          prompt: { type: 'string', description: 'Text prompt to send to Claude' },
        },
        required: ['prompt'],
      },
      handler: async (input: { prompt: string }) => {
        return await claudeService.sendMcpPrompt(input.prompt);
      },
    },
  };
}
