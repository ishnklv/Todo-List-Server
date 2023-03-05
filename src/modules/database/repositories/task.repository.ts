import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskEntity } from '../entities/task.entity';
import { Repository } from 'typeorm';
import { ListTasksQueryDto } from '../../task/dto/list-tasks-query.dto';
import { UserEntity } from '../entities/user.entity';
import { getSkipPaginationValue } from '../../../shared/utils';

@Injectable()
export class TaskRepository {
  constructor(
    @InjectRepository(TaskEntity)
    private readonly taskRepository: Repository<TaskEntity>,
  ) {}

  async create(taskData): Promise<TaskEntity | TaskEntity[]> {
    const task = this.taskRepository.create(taskData);

    return this.taskRepository.save(task);
  }

  async findById(id: number): Promise<TaskEntity | null> {
    return this.taskRepository.findOne({
      where: {
        id,
      },
    });
  }

  async findOne(query) {
    return this.taskRepository.findOne({
      where: query,
    });
  }

  async list(
    { page = 1, limit = 20, ...query }: ListTasksQueryDto,
    user: UserEntity,
  ) {
    const queryRunner = this.taskRepository
      .createQueryBuilder('task')
      .leftJoinAndSelect('task.user', 'user')
      .where('task.isDeleted = false')
      .andWhere('user.id = :userId', { userId: user.id });

    if (query.title) {
      queryRunner.andWhere('LOWER(task.title) like :name', {
        name: `%${query.title}%`,
      });
    }

    if (query.completed) {
      queryRunner.andWhere('task.isCompleted = :isCompleted', {
        isCompleted: query.completed,
      });
    }

    return queryRunner
      .skip(getSkipPaginationValue(page, limit))
      .take(limit)
      .getManyAndCount();
  }

  async updateById(id: number, updateData) {
    return this.taskRepository.update({ id }, updateData);
  }

  async softRemove(id: number) {
    return this.taskRepository.update(
      { id },
      {
        isDeleted: true,
      },
    );
  }
}
