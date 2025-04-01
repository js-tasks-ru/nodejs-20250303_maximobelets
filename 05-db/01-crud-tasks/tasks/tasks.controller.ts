import { Controller, Get, Post, Patch, Delete, Param, Body, NotFoundException } from "@nestjs/common";
import { TasksService } from "./tasks.service";
import { Task } from "./entities/task.entity";
import { CreateTaskDto } from "./dto/create-task.dto";

@Controller("tasks")
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  create(@Body() task: CreateTaskDto): Promise<Task> {
    return this.tasksService.create(task);
  }

  @Get()
  findAll(): Promise<Task[]> {
    return this.tasksService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: number): Promise<Task> {
    const task: Promise<Task> = this.tasksService.findOne(id);
    
    return task;
  }

  @Patch(":id")
  update(@Param("id") id: number, @Body() updatedTask: Partial<Task>) {
    const task: Promise<Task> = this.tasksService.update(id, updatedTask);
    
    return task;
  }

  @Delete(":id")
  remove(@Param("id") id: number): Promise<void> {
    const task: Promise<void> = this.tasksService.remove(id);

    return task;
  }
}
