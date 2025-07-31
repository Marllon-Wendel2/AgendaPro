import { config } from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';
import path from 'path';

config();

const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  url: process.env.DATABASE_URL,
  synchronize: false,
  entities: [path.join(__dirname, '/../**/*.entity.{ts,js}')],
  migrations: [path.join(__dirname, '/migrations/*.{ts,js}')],
};

export default new DataSource(dataSourceOptions);
