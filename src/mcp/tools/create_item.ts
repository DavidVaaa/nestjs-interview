import { TodoItemsService } from '../../todo_items/todo_items.service';

export function createItemTool(todoItemsService: TodoItemsService) {
  return {
    description: 'Crea un ítem en una lista con una descripción',
    input: {
      type: 'object',
      properties: {
        listId: { type: 'string' },
        description: { type: 'string' },
      },
      required: ['listId', 'description'],
    },
    handler: async ({
      listId,
      description,
    }: {
      listId: string;
      description: string;
    }) => {
      return await todoItemsService.create({ listId, description });
    },
  };
}
