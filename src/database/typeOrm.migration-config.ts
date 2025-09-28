import { config } from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';

config();

const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  url: process.env.DATABASE_URL,
  synchronize: false,
  logging: true,
  entities: ['src/modules/**/entities/*.entity.ts'],
  migrations: ['src/database/migration/*.ts'],
  subscribers: [],
};

export default new DataSource(dataSourceOptions);
