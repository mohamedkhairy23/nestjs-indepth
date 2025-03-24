import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export default (): TypeOrmModuleOptions => ({
  type: 'postgres',
  host: process.env.DATABASE_HOST,
  port: parseInt(process.env.DATABASE_PORT || '5432'),
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  ssl: true, // Ensure SSL is enabled
  extra: {
    ssl: {
      rejectUnauthorized: false, // Needed for NeonDB
    },
  },
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  synchronize: false,
});
