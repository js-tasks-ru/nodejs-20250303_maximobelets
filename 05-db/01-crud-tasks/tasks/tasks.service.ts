import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateTaskDto } from "./dto/create-task.dto";
import { UpdateTaskDto } from "./dto/update-task.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Task } from "./entities/task.entity";
import { DeleteResult, Repository } from "typeorm";

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>
  ) {}

  async create(createTaskDto: CreateTaskDto): Promise<Task> {
    const task = new Task();

    task.title = createTaskDto.title;
    task.description = createTaskDto.description;
    task.isCompleted = createTaskDto.isCompleted;

    await this.taskRepository.save(task)

    return task;
  }

  findAll(): Promise<Task[]> {
    return this.taskRepository.find()
  }

  async findOne(id: number): Promise<Task> {
    const task = await this.taskRepository.findOne({ where: { id } });

    if (!task) throw new NotFoundException('Task by represented id was not found');

    return task;
  }

  async update(id: number, updateTaskDto: UpdateTaskDto): Promise<Task> {
    const taskById: Task = await this.findOne(id)
    
    if (taskById) {
      await this.taskRepository.update(id, updateTaskDto);

      return await this.findOne(id);
    } else {
      throw new NotFoundException('Task by represented id was not found');
    }
  }

  async remove(id: number): Promise<void> {
    const taskById = await this.findOne(id)
    
    if (!taskById) throw new NotFoundException('Task by represented id was not found');
    
    await this.taskRepository.delete(id);
  }
}
