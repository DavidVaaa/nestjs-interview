// Import necessary decorators and modules from NestJS
import { Module } from '@nestjs/common';
// HttpModule allows making HTTP requests within the module
import { HttpModule } from '@nestjs/axios';
// ConfigModule provides access to environment variables and configuration
import { ConfigModule } from '@nestjs/config';

// Import the service and controller for Claude integration
import { ClaudeService } from './claude.service';
import { ClaudeController } from './claude.controller';

// Define the ClaudeModule which bundles controller, service, and required modules
@Module({
  // Import HttpModule and ConfigModule to enable HTTP requests and config management
  imports: [HttpModule, ConfigModule],

  // Register ClaudeService as a provider (injectable service)
  providers: [ClaudeService],

  // Register ClaudeController to handle incoming HTTP requests related to Claude
  controllers: [ClaudeController],

  // Export ClaudeService so it can be used in other modules if needed
  exports: [ClaudeService],
})
export class ClaudeModule {}
