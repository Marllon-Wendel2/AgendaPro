import { Appointment } from '../../appointment/entities/appointment.entity';
import { Client } from 'src/modules/client/entities/client.entity';
import { Service } from 'src/modules/services/entities/service.entity';
import { UserType } from '../../../types/UserType.enum';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  nome: string;

  @Column({ unique: true })
  email: string;

  @Column()
  senha: string;

  @Column({
    type: 'enum',
    enum: UserType,
    default: UserType.CLIENT,
  })
  type: UserType;

  @Column({ nullable: true })
  logoUrl: string;

  @Column({ default: true })
  active: boolean;

  @OneToMany(() => Service, (service) => service.owner)
  services: Service[];

  @OneToMany(() => Appointment, (appointment) => appointment.user)
  appointments: Appointment[];

  @OneToMany(() => Client, (client) => client.user)
  clients: Client[];

  @Column({ type: 'jsonb', nullable: true })
  colors: {
    primary: string;
    secondary: string;
    highlight: string;
    text: string;
  };
}
