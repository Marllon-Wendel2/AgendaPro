import { Appointment } from 'src/modules/appointment/entities/appointment.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Client {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  phone: string;

  @Column()
  plan: string;

  @OneToMany(() => Appointment, (appointment) => appointment.client)
  appointment: Appointment[];
}
