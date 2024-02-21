import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DbModule } from 'src/db/db.module';
import { TodoController } from './todo.controller';
import { TodoService } from './todo.service';

@Module({
  imports: [ConfigModule, DbModule],
  controllers: [TodoController],
  providers: [TodoService],
})
export class TodoModule {}
