import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios'; // ✅ Importás HttpModule
import { ConfigModule } from '@nestjs/config'; // ✅ Si usás ConfigService en ClaudeService

import { McpController } from './mcp.controller';
import { McpService } from './mcp.service';
import { McpToolsController } from './mcp-tools.controller';
import { ClaudeService } from '../claude/claude.service';
import { TodoItemsService } from '../todo_items/todo_items.service';
import { TodoListsService } from '../todo_lists/todo_lists.service';

@Module({
  imports: [HttpModule, ConfigModule], // ✅ Agregás HttpModule y ConfigModule
  controllers: [McpController, McpToolsController],
  providers: [McpService, ClaudeService, TodoItemsService, TodoListsService],
})
export class McpModule {}
