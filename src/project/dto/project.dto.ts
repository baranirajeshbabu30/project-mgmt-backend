// project-response.dto.ts
export class ProjectResponseDto {
  projectId: string;
  title: string;
  description: string;
  status: string;
  createdBy?: string;
  createdAt: Date;
  updatedAt: Date;
}

// create-project.dto.ts
import { IsEmail, IsIn, IsNotEmpty, IsString } from 'class-validator';

export class CreateProjectDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  @IsIn(['Active', 'In progress', 'Completed']) 
  status: string;

 
}
