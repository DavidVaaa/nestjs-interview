import { TodoItemsService } from '../../todo_items/todo_items.service';

export function completeItemTool(todoItemsService: TodoItemsService) {
  return {
    description: 'Marca un ítem como completado por su ID',
    input: {
      type: 'object',
      properties: {
        id: { type: 'string' },
      },
      required: ['id'],
    },
    handler: async ({ id }: { id: string }) => {
      return await todoItemsService.complete(id);
    },
  };
}
