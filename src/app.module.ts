import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { TodoListsModule } from './todo_lists/todo_lists.module';
import { TodoItemsModule } from './todo_items/todo_items.module';
import { McpModule } from './mcp/mcp.module';
import { ClaudeModule } from './claude/claude.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }), // ✅ DEBE ir primero
    HttpModule,
    TodoListsModule,
    TodoItemsModule,
    McpModule,
    ClaudeModule,
  ],
})
export class AppModule {}
