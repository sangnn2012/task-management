import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { v1 as uuidv1 } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';

@Injectable()
export class TasksService {
    private tasks: Task[] = [];

    getTasksWithFilters(filterDto: GetTasksFilterDto): Task[] {
        const { status, search } = filterDto;
        let filteredTasks = this.getAllTasks();

        if (status) {
            filteredTasks = filteredTasks.filter(t => t.status === status);
        }

        if (search) {
            filteredTasks = filteredTasks.filter(t =>
                t.title.includes(search) ||
                t.description.includes(search)
            )
        }

        return filteredTasks;
    }

    getAllTasks() {
        return this.tasks;
    }

    getTaskById(id: string): Task {
        return this.tasks.find(t => t.id === id);
    }

    removeTask(id: string): void {
        // const taskToRemove = this.tasks.find(t => t.id === id);
        // this.tasks.splice(this.tasks.indexOf(taskToRemove), 1);
        // find + splice = find
        this.tasks = this.tasks.filter(task => task.id !== id);
    }

    updateTaskStatus(id: string, status: TaskStatus): Task {
        const task = this.tasks.find(task => task.id === id);
        task.status = status;
        return task;
    }

    createTask(CreateTaskDto: CreateTaskDto): Task {
        const { title, description } = CreateTaskDto;

        const task: Task = {
            id: uuidv1(),
            title,
            description,
            status: TaskStatus.OPEN,
        };
        this.tasks.push(task);
        return task;
    }

    
}
