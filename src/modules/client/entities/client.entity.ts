import { Appointment } from 'src/modules/appointment/entities/appointment.entity';
import { User } from 'src/modules/user/entities/user.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Client {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  phone: string;

  @Column()
  plan: string;

  @OneToMany(() => Appointment, (appointment) => appointment.client)
  appointment: Appointment[];

  @ManyToOne(() => User, (user) => user.clients, { onDelete: 'CASCADE' })
  user: User;
}
