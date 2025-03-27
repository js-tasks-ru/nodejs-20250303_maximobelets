import { BadRequestException, PipeTransform } from "@nestjs/common";

export class ParseIntPipe implements PipeTransform {
  transform(value: string): number {
    const id: number = parseInt(value, 10);
    
    if (isNaN(id)) throw new BadRequestException(`"${value}" не является числом`);

    return id;
  }
}
