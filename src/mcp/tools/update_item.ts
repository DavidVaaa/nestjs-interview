import { TodoItemsService } from '../../todo_items/todo_items.service';

export function updateItemTool(todoItemsService: TodoItemsService) {
  return {
    description: 'Actualiza la descripción de un ítem por su ID',
    input: {
      type: 'object',
      properties: {
        id: { type: 'string' },
        description: { type: 'string' },
      },
      required: ['id', 'description'],
    },
    handler: async ({
      id,
      description,
    }: {
      id: string;
      description: string;
    }) => {
      return await todoItemsService.update(id, { description });
    },
  };
}
