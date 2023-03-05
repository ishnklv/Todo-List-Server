import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { routesConfig, validationPipeConfig } from '../../configs';
import {
  ApiBearerAuth,
  ApiBody,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { Actor } from '../../shared/decorators/actor.decorator';
import { UserEntity } from '../database/entities/user.entity';
import { TaskEntity } from '../database/entities/task.entity';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ListTasksQueryDto } from './dto/list-tasks-query.dto';
import { ListResponseDto } from '../../shared/dto/list-response.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@ApiBearerAuth()
@ApiTags('Tasks [User]')
@UseGuards(JwtAuthGuard)
@Controller(routesConfig.task.root)
@UsePipes(new ValidationPipe(validationPipeConfig))
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @ApiBody({
    type: () => CreateTaskDto,
  })
  @ApiResponse({
    type: () => TaskEntity,
  })
  @Post(routesConfig.task.create)
  async create(
    @Body() dto: CreateTaskDto,
    @Actor() user: UserEntity,
  ): Promise<TaskEntity> {
    return await this.taskService.create(dto, user);
  }

  @ApiParam({
    name: 'id',
    type: Number,
  })
  @Get(routesConfig.task.findById)
  async findById(
    @Param('id', new ParseIntPipe()) id: number,
    @Actor() user: UserEntity,
  ) {
    return this.taskService.findById(id, user);
  }

  @ApiQuery({
    type: String,
    name: 'title',
    required: false,
  })
  @ApiQuery({
    type: String,
    name: 'page',
    required: false,
  })
  @ApiQuery({
    type: String,
    name: 'limit',
    required: false,
  })
  @ApiQuery({
    type: Boolean,
    name: 'completed',
    required: false,
  })
  @ApiResponse({
    type: () => ListResponseDto,
  })
  @Get(routesConfig.task.list)
  async list(
    @Query() query: ListTasksQueryDto,
    @Actor() user: UserEntity,
  ): Promise<ListResponseDto<TaskEntity>> {
    return this.taskService.list(query, user);
  }

  @ApiBody({
    type: () => UpdateTaskDto,
  })
  @ApiResponse({
    type: () => TaskEntity,
  })
  @Put(routesConfig.task.updateById)
  async updateById(
    @Param('id') id: number,
    @Body() dto: UpdateTaskDto,
    @Actor() user: UserEntity,
  ): Promise<TaskEntity> {
    return this.taskService.updateById(id, dto, user);
  }
  @ApiResponse({
    type: () => TaskEntity,
  })
  @Delete(routesConfig.task.deleteById)
  async deleteById(
    @Param('id') id: number,
    @Actor() user: UserEntity,
  ): Promise<TaskEntity> {
    return this.taskService.deleteById(id, user);
  }
}
