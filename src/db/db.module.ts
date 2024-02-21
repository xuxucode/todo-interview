import { Module, Provider } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PoolOptions, createPool } from 'mysql2/promise';

export const MYSQL_CONNECTION = 'MYSQL_CONNECTION';

const dbProvider: Provider = {
  provide: MYSQL_CONNECTION,
  useFactory: () => {
    return createPool({
      host: process.env.MYSQL_HOST,
      port: +process.env.MYSQL_PORT,
      user: process.env.MYSQL_USER,
      database: process.env.MYSQL_DATABASE,
      password: process.env.MYSQL_PASSWORD,
      charset: 'UTF8MB4_UNICODE_CI', // 允许表情符号等
      timezone: '+08:00', // 中国大陆东8区
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
    } satisfies PoolOptions);
  },
  inject: [ConfigService],
};

@Module({
  providers: [dbProvider, ConfigService],
  exports: [dbProvider],
})
export class DbModule {}
