import { Controller, Post, Body } from '@nestjs/common';
import { ClaudeService } from '../claude/claude.service';
import { TodoItemsService } from '../todo_items/todo_items.service';

@Controller('mcp/tools')
export class McpToolsController {
  constructor(
    private readonly claudeService: ClaudeService,
    private readonly todoItemsService: TodoItemsService,
  ) {}

@Post('todo-item')
  async handleTodoPrompt(@Body('prompt') prompt: string) {
    const extractionPrompt = `
    Eres un asistente que transforma instrucciones en JSON para manipular ítems de listas de tareas.
    Dado un texto, devuelve el JSON con la acción y los parámetros necesarios. Usa estos formatos:

    Para crear:
    {
    "action": "createItem",
    "listName": "Trabajo",
    "description": "Terminar informe"
    }

    Para actualizar:
    {
    "action": "updateItem",
    "itemId": "123",
    "description": "Descripción nueva"
    }

    Para completar:
    {
    "action": "completeItem",
    "itemId": "123"
    }

    Para eliminar:
    {
    "action": "deleteItem",
    "itemId": "123"
    }

    Entrada: "${prompt}"
    Salida:
    `;

    const rawResponse = await this.claudeService.sendMcpPrompt(extractionPrompt);

    // EXTRAER texto JSON desde la estructura recibida
    const rawText =
        rawResponse?.content?.[0]?.text ||
        rawResponse; // fallback si es un string simple

    let parsed;
    try {
        parsed = JSON.parse(rawText);
    } catch (err) {
        return { error: 'Claude no devolvió un JSON válido.', detalle: rawResponse };
    }

    switch (parsed.action) {
        case 'createItem':
        return this.todoItemsService.create({
          listId: parsed.listName, // ← asumimos que listName = ID
          description: parsed.description,
        });

        case 'updateItem':
        return this.todoItemsService.update(parsed.itemId, parsed.description);

        case 'completeItem':
        return this.todoItemsService.complete(parsed.itemId);

        case 'deleteItem':
        return this.todoItemsService.delete(parsed.itemId);

        default:
        return { error: `Acción no reconocida: ${parsed.action}` };
    }
    }
}
