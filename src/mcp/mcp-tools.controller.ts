import { Controller, Post, Body } from '@nestjs/common';
import { ClaudeService } from '../claude/claude.service';
import { TodoItemsService } from '../todo_items/todo_items.service';

@Controller('mcp/tools')
export class McpToolsController {
  constructor(
    private readonly claudeService: ClaudeService,    // Service to send prompts to Claude AI
    private readonly todoItemsService: TodoItemsService,  // Service to manipulate todo items in DB
  ) {}

  @Post()
  async handleTodoPrompt(@Body('prompt') prompt: string) {
    // Compose a detailed prompt to Claude to convert natural language instructions
    // into a structured JSON action for manipulating todo list items.
    const extractionPrompt = `
    You are an assistant that transforms instructions into JSON commands for managing todo list items.
    Given a text input, return JSON with the action and necessary parameters. Use these formats:

    To create:
    {
      "action": "createItem",
      "listName": "Work",
      "description": "Finish report"
    }

    To update:
    {
      "action": "updateItem",
      "itemId": "123",
      "description": "New description"
    }

    To complete:
    {
      "action": "completeItem",
      "itemId": "123"
    }

    To delete:
    {
      "action": "deleteItem",
      "itemId": "123"
    }

    Input: "${prompt}"
    Output:
    `;

    // Send the prompt to Claude AI service and get raw response
    const rawResponse = await this.claudeService.sendMcpPrompt(extractionPrompt);

    // Extract the JSON text from the AI response; fallback if simple string
    const rawText =
      rawResponse?.content?.[0]?.text || rawResponse;

    let parsed;
    try {
      // Parse the JSON returned by Claude
      parsed = JSON.parse(rawText);
    } catch (err) {
      // Return error if Claude's output is not valid JSON
      return { error: 'Claude did not return valid JSON.', detail: rawResponse };
    }

    // Perform the appropriate todo item action based on parsed JSON 'action' field
    switch (parsed.action) {
      case 'createItem':
        // Create a new todo item; listName is assumed to be list ID here
        return this.todoItemsService.create({
          listId: parsed.listName,
          description: parsed.description,
        });

      case 'updateItem':
        // Update the description of an existing todo item
        return this.todoItemsService.update(parsed.itemId, parsed.description);

      case 'completeItem':
        // Mark a todo item as complete
        return this.todoItemsService.complete(parsed.itemId);

      case 'deleteItem':
        // Delete a todo item
        return this.todoItemsService.delete(parsed.itemId);

      default:
        // Return error if the action is unknown
        return { error: `Unrecognized action: ${parsed.action}` };
    }
  }
}
