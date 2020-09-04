import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TaskRepository } from './task.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { TaskStatus } from './task.status.enum';
@Injectable()
export class TasksService {
    constructor(
        @InjectRepository(TaskRepository)
        private taskRepository: TaskRepository
    ) {}

    async getTasks(filterDto: GetTasksFilterDto): Promise<Task[]> {
        return this.taskRepository.getTasks(filterDto);
    }

    async getTaskById(id: number): Promise<Task> {
        const found = await this.taskRepository.findOne(id);
        if(!found) {
            throw new NotFoundException(`Task with ID "${id}" not found!`)
        }
        return found;
    }

    async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
        return this.taskRepository.createTask(createTaskDto);
    }

    // getTaskById(id: string): Task {
    //     const found = this.tasks.find(t => t.id === id);
    //     if(!found) {
    //         throw new NotFoundException(`Task with ID "${id}" not found!`)
    //     }
    //     return found;
    // }

    async removeTask(id: number): Promise<Task> {
        // const taskToRemove = this.tasks.find(t => t.id === id);
        // this.tasks.splice(this.tasks.indexOf(taskToRemove), 1);
        // find + splice = filter
        const found = await this.getTaskById(id);
        return this.taskRepository.remove(found);
    }

    async deleteTask(id: number): Promise<void> {
        const result = await this.taskRepository.delete(id);
        
        if (!result.affected) {
            throw new NotFoundException(`Task with ID "${id}" not found!`)
        }
    }

    async updateTaskStatus(id: number, status: TaskStatus): Promise<Task> {
        const task = await this.getTaskById(id);
        task.status = status;
        task.save();
        return task;
    }
}
