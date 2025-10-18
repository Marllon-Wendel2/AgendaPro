import { ApiProperty } from '@nestjs/swagger';
import { Appointment } from '../../appointment/entities/appointment.entity';
import { User } from '../../user/entities/user.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Service {
  @ApiProperty({ example: 'uuid-gerado-pelo-sistema' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ example: 'Corte de cabelo' })
  @Column()
  name: string;

  @ApiProperty({ example: 'Corte completo com lavagem e finalização' })
  @Column()
  description: string;

  @ApiProperty({ example: 45, description: 'Duração em minutos' })
  @Column()
  duration: number;

  @ApiProperty({ example: 59.9 })
  @Column()
  price: number;

  @ApiProperty({ example: true })
  @Column({ default: true })
  available: boolean;

  @ApiProperty({ type: () => User })
  @ManyToOne(() => User, (user) => user.services, { onDelete: 'CASCADE' })
  owner: User;

  @OneToMany(() => Appointment, (appointment) => appointment.service)
  appointments: Appointment[];
}
