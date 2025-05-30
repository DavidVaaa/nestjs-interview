import { TodoItemsService } from '../../todo_items/todo_items.service';

export function deleteItemTool(todoItemsService: TodoItemsService) {
  return {
    description: 'Elimina un ítem por su ID',
    input: {
      type: 'object',
      properties: {
        id: { type: 'string' },
      },
      required: ['id'],
    },
    handler: async ({ id }: { id: string }) => {
      return await todoItemsService.delete(id);
    },
  };
}
