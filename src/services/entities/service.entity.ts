import { User } from 'src/user/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Service {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  duration: number;

  @Column()
  price: number;

  @Column({ default: true })
  available: boolean;

  @ManyToOne(() => User, (user) => user.services, { onDelete: 'CASCADE' })
  owner: User;
}
