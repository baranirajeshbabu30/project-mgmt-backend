import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Project, ProjectDocument } from './schemas/project.schema';
import { CreateProjectDto } from './dto/project.dto';
import { UpdateProjectDto } from './dto/update.dto';
import { ProjectGateway } from './gateway/project.gateway';

@Injectable()
export class ProjectService {
  constructor(
    @InjectModel(Project.name)
    private readonly projectModel: Model<ProjectDocument>,
    private readonly gateway: ProjectGateway
  ) {}

  async create(data: any): Promise<Project> {
    const project = new this.projectModel(data);
    const savedProject = await project.save();

    this.gateway.sendProjectEvent('created', savedProject); // 🔔 Notify clients
    return savedProject;
  }

  async findAll(): Promise<Project[]> {
    return await this.projectModel.find().exec();
  }

  async findById(id: string): Promise<Project> {
    const project = await this.projectModel.findById(id).exec();
    if (!project) throw new NotFoundException('Project not found');
    return project;
  }

  async updateById(id: string, dto: UpdateProjectDto): Promise<Project> {
    const existing = await this.projectModel.findById(id);
    if (!existing) throw new NotFoundException('Project not found for update');

    const fieldsToUpdate = Object.entries(dto).reduce((acc, [key, value]) => {
      if (value !== undefined && value !== existing[key]) {
        acc[key] = value;
      }
      return acc;
    }, {} as any);

    if (Object.keys(fieldsToUpdate).length === 0) {
      return existing;
    }

    fieldsToUpdate['updatedAt'] = new Date();

    const updated = await this.projectModel.findByIdAndUpdate(id, fieldsToUpdate, {
      new: true,
    });

    if (!updated) throw new NotFoundException('Project not found after update');

    this.gateway.sendProjectEvent('updated', updated); // 🔔 Notify clients
    return updated;
  }

  async deleteById(id: string): Promise<{ message: string }> {
    const deleted = await this.projectModel.findByIdAndDelete(id).exec();
    if (!deleted) throw new NotFoundException('Project not found for deletion');

    this.gateway.sendProjectEvent('deleted', deleted); // 🔔 Notify clients
    return { message: 'Project deleted successfully' };
  }
}
