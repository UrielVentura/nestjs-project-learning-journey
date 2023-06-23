import { BaseEntity } from '../../config/base.entity';
import { ACCES_LEVEL } from '../../constants/roles';
import { Column, Entity, ManyToOne } from 'typeorm';
import { UsersEntity } from './users.entity';
import { ProjectsEntity } from '../../projects/entities/project.entity';

@Entity({ name: 'users_projects' })
export class UsersProjectsEntity extends BaseEntity {
  @Column({ type: 'enum', enum: ACCES_LEVEL })
  accesslevel: ACCES_LEVEL;

  @ManyToOne(() => UsersEntity, (user) => user.projectsIncludes)
  user: UsersEntity;
  @ManyToOne(() => ProjectsEntity, (project) => project.userIncludes)
  project: ProjectsEntity;
}
