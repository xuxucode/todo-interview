import { Inject, Injectable } from '@nestjs/common';
import { Pool, ResultSetHeader, RowDataPacket } from 'mysql2/promise';

import { MYSQL_CONNECTION } from '../db/db.module';
import { CreateTodoDto } from './dto/create-todo.dto';
import { type Todo } from './interfaces/todo.interface';

@Injectable()
export class TodoService {
  constructor(@Inject(MYSQL_CONNECTION) private conn: Pool) {}

  /**
   * 查询所有的 Todo
   */
  async list(): Promise<Todo[]> {
    const sql = `
      SELECT id, title, is_complete
      FROM todo
    `;
    const [rows] = await this.conn.query(sql);
    const todos = (rows as RowDataPacket[]).map<Todo>((row) => ({
      id: row.id,
      title: row.title,
      isComplete: row.is_complete !== 0,
    }));

    return todos;
  }

  /**
   * 根据提供的 id 获取某个 Todo
   */
  async get(id: number): Promise<Todo | null> {
    const sql = `
      SELECT id, title, is_complete
      FROM todo
      WHERE id = ?
    `;
    const [rows] = await this.conn.query(sql, [id]);
    const row = rows[0] as RowDataPacket | undefined;
    if (row) {
      return {
        id: row.id,
        title: row.title,
        isComplete: row.is_complete !== 0,
      };
    }

    return null;
  }

  /**
   * 插入 Todo
   */
  async insert(dto: CreateTodoDto): Promise<Todo> {
    const row = {
      title: dto.title,
      is_complete: 0,
    };
    const sql = 'INSERT INTO todo set ?';
    const [result] = await this.conn.query(sql, [row]);

    const id = (result as ResultSetHeader).insertId;
    return {
      id,
      title: dto.title,
      isComplete: false,
    };
  }

  /**
   * 删除指定的 Todo
   */
  async delete(id: number): Promise<void> {
    const sql = 'DELETE FROM todo WHERE id = ?';
    await this.conn.query(sql, [id]);
  }

  // 正式环境需要考虑数据不存在等异常情况，在此省略
  async setComplete(id: number): Promise<Todo> {
    const changes = {
      is_complete: 1,
    };
    const sql = `
      UPDATE todo
      SET ?
      WHERE id = ?
    `;
    await this.conn.query(sql, [changes, id]);

    return await this.get(id)!;
  }
}
