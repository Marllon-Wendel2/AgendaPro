import { User } from 'src/modules/user/entities/user.entity';
import { Service } from 'src/services/entities/service.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Appointment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (user) => user.appointments)
  user: User;

  @Column()
  clientName: string;

  @Column()
  clientPhone: string;

  @ManyToOne(() => Service, (service) => service.appointments)
  service: Service;

  @Column({ type: 'timestamp' })
  hour: Date;

  @CreateDateColumn()
  createdAt: Date;
}
