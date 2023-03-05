import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseEntity } from '../../../shared/base/base.entity';
import { UserEntity } from './user.entity';

@Entity('tasks')
export class TaskEntity extends BaseEntity {
  @Column({
    type: 'varchar',
  })
  title: string;

  @Column({
    type: 'text',
  })
  description: string;

  @Column({
    type: 'boolean',
    default: false,
  })
  isCompleted: boolean;

  @ManyToOne(() => UserEntity, (user) => user.tasks)
  user: UserEntity;
}
