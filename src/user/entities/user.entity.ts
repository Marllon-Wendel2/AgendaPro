import { Service } from 'src/services/entities/service.entity';
import { UserType } from 'src/types/UserType.enum';
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

  @OneToMany(() => Service, (service) => service.owner)
  services: Service[];
}
