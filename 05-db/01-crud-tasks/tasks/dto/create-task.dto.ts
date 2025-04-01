import { IsBoolean, IsOptional } from 'class-validator';

export class CreateTaskDto {
    title: string;
    description: string;
    
    @IsBoolean()
    @IsOptional()
    isCompleted: boolean;
}
