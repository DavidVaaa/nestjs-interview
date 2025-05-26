import { IsString, IsNotEmpty } from 'class-validator';

export class CreateTodoItemDto {
  @IsString()
  @IsNotEmpty()
  listId: string;

  @IsString()
  @IsNotEmpty()
  description: string;
}