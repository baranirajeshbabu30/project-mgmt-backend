import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  UseGuards,
  Req,
} from '@nestjs/common';
import { ProjectService } from './project.service';
import { CreateProjectDto } from './dto/project.dto';
import { UpdateProjectDto } from './dto/update.dto';
import { RolesGuard } from 'src/auth/roles/roles.guard';
import { Roles } from 'src/auth/roles/roles.decorator';
import { Role } from 'src/auth/roles/role.enum';
import { JwtAuthGuard } from 'src/auth/strategies/jwt-auth.guard';

@Controller('api/projects')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Post()
  @Roles(Role.Admin)
  async create(@Body() dto: CreateProjectDto, @Req() req: any) {
    const user = req.user;
    

    const projectData = {
      ...dto,
      createdBy: user?.email, // inject email from JWT
    };

    return this.projectService.create(projectData);
  }

  @Get()
  @Roles(Role.Admin, Role.Viewer)
  findAll() {
    return this.projectService.findAll();
  }

  @Get(':id')
  @Roles(Role.Admin, Role.Viewer)
  findById(@Param('id') id: string) {
    return this.projectService.findById(id);
  }

  @Patch(':id')
@Roles(Role.Admin)
update(@Param('id') id: string, @Body() dto: UpdateProjectDto) {
  return this.projectService.updateById(id, dto);
}


  @Delete(':id')
  @Roles(Role.Admin)
  remove(@Param('id') id: string) {
    return this.projectService.deleteById(id);
  }
}
