## 部署

- 复制 `.env.exmaple` 到 `.env`，修改 MySQL 数据库连接参数
- 运行 `docker compose -f compose.yml up -d` 启动数据库
- 运行 `npm start` 启动服务
- 请求 `http://localhost:3000/todos` 等 API

## 接口

- `GET /todos`: 获取所有 Todo
- `DELETE /todos/:id`: 删除某个 Todo
- `PATCH /todos/:id/complete`: 把某个 Todo 设置为完成状态

## 数据库结构

`todo` 表：
| 列             | 类型          |
| ------------- | ------------- |
| id            | int           |
| title         | varchar       |
| is_complete   | int           |

相信信息请参考 [data/todo.sql](./data/todo.sql)
