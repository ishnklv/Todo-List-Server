import { Injectable, NotFoundException } from '@nestjs/common';
import { UserEntity } from '../database/entities/user.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskRepository } from '../database/repositories/task.repository';
import { TaskEntity } from '../database/entities/task.entity';
import { ListResponseDto } from '../../shared/dto/list-response.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TaskService {
  constructor(private readonly taskRepository: TaskRepository) {}

  async create(dto: CreateTaskDto, user: UserEntity) {
    return (await this.taskRepository.create({
      ...dto,
      user,
    })) as TaskEntity;
  }

  async findById(id: number, user: UserEntity) {
    const task = await this.taskRepository.findOne({
      id,
      user,
    });

    if (!task) {
      throw new NotFoundException('Not found task');
    }

    return task;
  }

  async list(query, user): Promise<ListResponseDto<TaskEntity>> {
    const [items, count] = await this.taskRepository.list(query, user);

    return {
      totalCount: count,
      items,
    };
  }

  async updateById(
    id: number,
    dto: UpdateTaskDto,
    user: UserEntity,
  ): Promise<TaskEntity> {
    const task = await this.taskRepository.findOne({ id, user });

    if (!task) {
      throw new NotFoundException('Not found task');
    }

    const updateData = { ...task, ...dto, updateDate: new Date() };

    await this.taskRepository.updateById(id, updateData);

    return this.taskRepository.findById(id);
  }

  async deleteById(id: number, user: UserEntity) {
    const task = await this.taskRepository.findOne({ id, user });

    if (!task) {
      throw new NotFoundException('Not found task');
    }

    await this.taskRepository.softRemove(id);

    return this.taskRepository.findById(task.id);
  }
}
