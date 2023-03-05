import { BeforeInsert, Column, Entity, OneToMany } from 'typeorm';
import { BaseEntity } from '../../../shared/base/base.entity';
import { UserStatusEnum } from '../../user/enum/status.enum';
import { encryptPassword } from '../../../shared/utils';
import { TaskEntity } from './task.entity';

@Entity('users')
export class UserEntity extends BaseEntity {
  @Column({
    type: 'varchar',
  })
  login: string;

  @Column({
    type: 'varchar',
  })
  password: string;

  @Column({
    enum: UserStatusEnum,
    default: UserStatusEnum.INITIAL,
  })
  status: UserStatusEnum;

  @OneToMany(() => TaskEntity, (task) => task.user)
  tasks: TaskEntity[];

  @BeforeInsert()
  async hashPassword() {
    this.password = await encryptPassword(this.password);
  }
}
