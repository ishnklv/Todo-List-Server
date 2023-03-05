import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeormConfig } from './typeorm.config';
import { UserEntity } from './entities/user.entity';
import { UserRepository } from './repositories/user.repository';
import { TaskEntity } from './entities/task.entity';
import { TaskRepository } from './repositories/task.repository';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useClass: TypeormConfig,
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([UserEntity, TaskEntity]),
  ],
  providers: [UserRepository, TaskRepository],
  exports: [UserRepository, TaskRepository],
})
export class DatabaseModule {}
