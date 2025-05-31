import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios'; // Provides HttpService for making HTTP requests
import { ConfigModule } from '@nestjs/config'; // Provides ConfigService for environment variables

import { McpController } from './mcp.controller';
import { McpService } from './mcp.service';
import { McpToolsController } from './mcp-tools.controller';
import { ClaudeService } from '../claude/claude.service';
import { TodoItemsService } from '../todo_items/todo_items.service';
import { TodoListsService } from '../todo_lists/todo_lists.service';

@Module({
  // Import modules required by providers for HTTP calls and config access
  imports: [HttpModule, ConfigModule], 
  // Register controllers handling MCP and MCP tools endpoints
  controllers: [McpController, McpToolsController],
  // Register service providers for MCP logic, Claude API interaction,
  // and todo items/lists management
  providers: [McpService, ClaudeService, TodoItemsService, TodoListsService],
})
export class McpModule {}
