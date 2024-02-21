import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
} from '@nestjs/common';

import { CreateTodoDto } from './dto/create-todo.dto';
import { type Todo } from './interfaces/todo.interface';
import { TodoService } from './todo.service';

@Controller('todos')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  /**
   * 获取所有的 Todo
   */
  @Get()
  async findAll(): Promise<Todo[]> {
    return this.todoService.list();
  }

  /**
   * 创建新的 Todo
   */
  @Post()
  @HttpCode(201)
  async create(@Body() dto: CreateTodoDto): Promise<Todo> {
    return this.todoService.insert(dto);
  }

  /**
   * 删除一个 Todo
   */
  @Delete(':id')
  @HttpCode(204)
  async delete(@Param('id') id: number): Promise<void> {
    await this.todoService.delete(id);
  }

  /**
   * 设置一个 Todo 为完成状态
   */
  @Patch(':id/complete')
  async complete(@Param('id') id: number): Promise<Todo> {
    return this.todoService.setComplete(id);
  }
}
