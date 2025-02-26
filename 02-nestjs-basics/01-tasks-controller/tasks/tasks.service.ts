import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { Task } from "./task.model";

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAllTasks(): Task[] {
    return this.tasks;
  }

  getTaskById(id: string): Task {
    const taskById: Task = this.tasks.find(task => task.id === id);

    if (!taskById) {
      throw new HttpException('This task does not exist', HttpStatus.NOT_FOUND);
    }

    return taskById;
  }

  createTask(task: Task): Task {
    const newTask: Task = {
      ...task,
      id: String(this.tasks.length + 1)
    }

    this.tasks.push(newTask)

    return newTask;
  }

  updateTask(id: string, update: Task): Task {
    const updatedTaskIndex: number = this.tasks.findIndex(task => task.id === id);

    const updatedTask = {
      id: id,
      ...update,
    }

    this.tasks.splice(updatedTaskIndex, 1, updatedTask);

    return {
      id: updatedTask.id,
      ...update,
    }
  }

  deleteTask(id: string): Task {
    const deletedTaskIndex: number = this.tasks.findIndex(task => task.id === id);
    const deletedTask: Task = this.tasks.find(task => task.id === id);

    if (!deletedTask) {
      throw new HttpException('This task does not exist', HttpStatus.NOT_FOUND);
    };

    this.tasks.splice(deletedTaskIndex, 1);

    return deletedTask;
  }
}
