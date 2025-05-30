import { Module } from '@nestjs/common';
import { TodoItemsService } from './todo_items.service';
import { TodoItemsController } from './todo_items.controller';

@Module({
  providers: [TodoItemsService],
  controllers: [TodoItemsController],
  exports: [TodoItemsService],
})
export class TodoItemsModule {}
