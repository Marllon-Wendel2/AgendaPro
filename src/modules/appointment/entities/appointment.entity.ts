import { Client } from '../../client/entities/client.entity';
import { User } from '../../user/entities/user.entity';
import { Service } from '../../services/entities/service.entity';
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

  @ManyToOne(() => Client, (client) => client.appointment, { eager: true })
  client: Client;

  @ManyToOne(() => Service, (service) => service.appointments)
  service: Service;

  @Column({ type: 'timestamp' })
  hour: Date;

  @CreateDateColumn()
  createdAt: Date;
}
