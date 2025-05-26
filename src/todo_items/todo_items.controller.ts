import {
  Controller,
  Post,
  Body,
  Put,
  Patch,
  Delete,
  Param,
  Get,
} from '@nestjs/common';
import { TodoItemsService } from './todo_items.service';
import { CreateTodoItemDto } from './dto/create-todo-item.dto';
import { UpdateTodoItemDto } from './dto/update-todo-item.dto';
import { TodoItem } from './entities/todo-item.entity';

@Controller('items')
export class TodoItemsController {
  constructor(private readonly todoItemsService: TodoItemsService) {}

  @Post()
  create(@Body() dto: CreateTodoItemDto): TodoItem {
    return this.todoItemsService.create(dto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdateTodoItemDto): TodoItem {
    return this.todoItemsService.update(id, dto);
  }

  @Patch(':id/complete')
  complete(@Param('id') id: string): TodoItem {
    return this.todoItemsService.complete(id);
  }

  @Delete(':id')
  delete(@Param('id') id: string): void {
    this.todoItemsService.delete(id);
  }

  @Get('/list/:listId')
  findByListId(@Param('listId') listId: string): TodoItem[] {
    return this.todoItemsService.findByListId(listId);
  }
}
