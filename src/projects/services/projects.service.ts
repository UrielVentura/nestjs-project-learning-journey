import { Injectable } from '@nestjs/common';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { ProjectsEntity } from '../entities/project.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ProjectDTO, ProjectUpdateDTO } from '../dto/projects.dto';
import { ErrorHandler } from 'src/utils/error.handler';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(ProjectsEntity)
    private readonly projectRepository: Repository<ProjectsEntity>,
  ) {}

  public async createProject(body: ProjectDTO): Promise<ProjectsEntity> {
    try {
      return await this.projectRepository.save(body);
    } catch (error) {
      throw ErrorHandler.createSignatureError(error.message);
    }
  }

  public async findProjects(): Promise<ProjectsEntity[]> {
    try {
      const projects = await this.projectRepository.find();
      if (projects.length === 0) {
        throw new ErrorHandler({
          type: 'BAD_REQUEST',
          message: 'No projects found',
        });
      }
      return projects;
    } catch (error) {
      throw ErrorHandler.createSignatureError(error.message);
    }
  }

  public async findProjectById(id: string): Promise<ProjectsEntity> {
    try {
      const project = await this.projectRepository
        .createQueryBuilder('projects')
        .where({ id })
        .leftJoinAndSelect('projects.userIncludes', 'userIncludes')
        .leftJoinAndSelect('userIncludes.user', 'user')
        .getOne();
      if (!project) {
        throw new ErrorHandler({
          type: 'BAD_REQUEST',
          message: 'No projects found',
        });
      }
      return project;
    } catch (error) {
      throw ErrorHandler.createSignatureError(error.message);
    }
  }

  public async updateProject(
    body: ProjectUpdateDTO,
    id: string,
  ): Promise<UpdateResult | undefined> {
    try {
      const project: UpdateResult = await this.projectRepository.update(
        id,
        body,
      );
      if (project.affected === 0) {
        throw new ErrorHandler({
          type: 'BAD_REQUEST',
          message: 'Could not update project',
        });
      }
      return project;
    } catch (error) {
      throw ErrorHandler.createSignatureError(error.message);
    }
  }

  public async deleteProject(id: string): Promise<DeleteResult | undefined> {
    try {
      const project: DeleteResult = await this.projectRepository.delete(id);
      if (project.affected === 0) {
        throw new ErrorHandler({
          type: 'BAD_REQUEST',
          message: 'Could not delete project',
        });
      }
      return project;
    } catch (error) {
      throw ErrorHandler.createSignatureError(error.message);
    }
  }
}
