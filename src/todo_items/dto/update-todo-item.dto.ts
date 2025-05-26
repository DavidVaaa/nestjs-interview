import { IsOptional, IsString, IsBoolean } from 'class-validator';

export class UpdateTodoItemDto {
  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsBoolean()
  completed?: boolean;
}