import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { Task, TaskStatus } from "./task.model";

@Injectable()
export class TasksService {
  private tasks: Task[] = [
    {
      id: "1",
      title: "Task 1",
      description: "First task",
      status: TaskStatus.PENDING,
    },
    {
      id: "2",
      title: "Task 2",
      description: "Second task",
      status: TaskStatus.IN_PROGRESS,
    },
    {
      id: "3",
      title: "Task 3",
      description: "Third task",
      status: TaskStatus.COMPLETED,
    },
    {
      id: "4",
      title: "Task 4",
      description: "Fourth task",
      status: TaskStatus.PENDING,
    },
    {
      id: "5",
      title: "Task 5",
      description: "Fifth task",
      status: TaskStatus.IN_PROGRESS,
    },
  ];

  getFilteredTasks(
    status?: TaskStatus,
    page?: number,
    limit?: number,
  ): Task[] {
    if ((page && (isNaN(page) || page <= 0)) || (limit && (isNaN(limit) || limit <= 0))) {
      throw new BadRequestException('Something bad happened', {
        cause: new Error(),
        description: 'Some error description',
      });
    }

    if (this.tasks.length === 0) {
      throw new NotFoundException('No tasks')
    }

    const filteredTasks: Task[] = status ? 
      this.tasks.filter((task: Task) => task.status === status)
      : this.tasks;
    // 10 items, (5, 1) =>
    if (limit && page) {
      const pages: number = Math.ceil(filteredTasks.length / limit);
      const startPage: number = (page - 1) * limit;

      if (page > pages) return [];

      return filteredTasks.slice(0, startPage + limit)
    }

    return filteredTasks;
  }
}
