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
    const task = await this.taskRepository.update(id, updateTaskDto)

    if (!task) throw new NotFoundException('Task by represented id was not found');

    return this.findOne(id)
  }

  async remove(id: number): Promise<void> {
    const takById = await this.findOne(id)
    
    await this.taskRepository.delete(id);

    if (!takById) throw new NotFoundException('Task by represented id was not found');
  }
}
