export class TodoItem {
  id: string;
  listId: string;
  description: string;
  completed: boolean;

  constructor(partial: Partial<TodoItem>) {
    Object.assign(this, partial);
  }
}
