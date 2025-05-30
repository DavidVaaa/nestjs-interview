import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { ClaudeService } from './claude.service';
import { ClaudeController } from './claude.controller';

@Module({
  imports: [HttpModule, ConfigModule],
  providers: [ClaudeService],
  controllers: [ClaudeController],
  exports: [ClaudeService], // exportar para otros módulos
})
export class ClaudeModule {}
