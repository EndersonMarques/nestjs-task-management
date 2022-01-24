import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { CreateTaskDto } from './dto/create-task-dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter-dto';
import { UpdateTaskDto } from './dto/update-task-dto';
import { TaskStatus } from './task-status.enum';
import { Task } from './task.entity';
import { TasksRepository } from './tasks.repositoty';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TasksRepository)
    private tasksRepository: TasksRepository,
  ) {}

  getTasks(filterDto: GetTasksFilterDto) {
    return this.tasksRepository.getTasks(filterDto);
  }

  createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    return this.tasksRepository.createTasks(createTaskDto);
  }

  async getTasksById(id: string): Promise<Task> {
    const found = await this.tasksRepository.findOne(id);

    if (!found) {
      throw new NotFoundException();
    }
    return found;
  }

  async deleteTask(id: string): Promise<Task> {
    const found = await this.getTasksById(id);

    if (!found) {
      throw new NotFoundException();
    }

    await this.tasksRepository.delete(found);

    return found;
  }

  async updateTaskStatus(id: string, status: TaskStatus): Promise<Task> {
    const task = await this.getTasksById(id);

    task.status = status;
    await this.tasksRepository.save(task);

    return task;
  }
}
