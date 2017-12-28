import { Get, Post, Put, Delete, Controller, Body, Param } from '@nestjs/common';

import { ParseIntPipe } from '../common/pipes/parse-int.pipe';
import { ValidationPipe } from '../common/pipes/validation.pipe';

import { ProjectsService } from './projects.service';
import { Project } from './interfaces/project.interface';
import { CreateProjectDto } from './dto/create-project.dto';

@Controller('api/v1/projects')
export class ProjectsController {

  constructor(private readonly projectsService: ProjectsService) { }

  @Post()
  async create( @Body(new ValidationPipe()) createProjectDto: CreateProjectDto) {
    this.projectsService.create(createProjectDto);
  }

  @Get()
  async findAll(): Promise<Project[]> {
    return this.projectsService.findAll();
  }

  @Get(':id')
  findOne( @Param('id', new ParseIntPipe()) id): Promise<Project> {
    // logic
    return this.projectsService.findOne(id);
  }

  @Put(':id')
  findOneAndUpdate( @Body(new ValidationPipe()) createProjectDto: CreateProjectDto) {
    // logic
  }

  @Delete(':id')
  delete( @Param('id', new ParseIntPipe()) id) {
    // logic
  }
}