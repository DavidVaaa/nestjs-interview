import { Injectable, NotFoundException } from '@nestjs/common';
import { TodoItem } from './entities/todo-item.entity';
import { CreateTodoItemDto } from './dto/create-todo-item.dto';
import { UpdateTodoItemDto } from './dto/update-todo-item.dto';
import { randomUUID } from 'crypto';

@Injectable()
export class TodoItemsService {
  private items: TodoItem[] = [];

  create(dto: CreateTodoItemDto): TodoItem {
    const newItem = new TodoItem({
      id: randomUUID(),
      listId: dto.listId,
      description: dto.description,
      completed: false,
    });

    this.items.push(newItem);
    return newItem;
  }

  update(id: string, dto: UpdateTodoItemDto): TodoItem {
    const item = this.items.find((item) => item.id === id);
    if (!item) throw new NotFoundException('Item not found');

    if (dto.description !== undefined) {
      item.description = dto.description;
    }

    if (dto.completed !== undefined) {
      item.completed = dto.completed;
    }

    return item;
  }

  complete(id: string): TodoItem {
    const item = this.items.find((item) => item.id === id);
    if (!item) throw new NotFoundException('Item not found');

    item.completed = true;
    return item;
  }

  delete(id: string): void {
    const index = this.items.findIndex((item) => item.id === id);
    if (index === -1) throw new NotFoundException('Item not found');

    this.items.splice(index, 1);
  }

  findByListId(listId: string): TodoItem[] {
    return this.items.filter((item) => item.listId === listId);
  }
}
