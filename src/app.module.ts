import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksModule } from './tasks/tasks-status.enum';

@Module({
  imports: [
    TasksModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      name: 'localhost',
      username: 'postgres',
      password: 'postgres',
      database: 'task-managament',
      autoLoadEntities: true,
      synchronize: true,
    }),
  ],
})
export class AppModule {}
