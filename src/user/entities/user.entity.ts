import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  /**
   * this decorator will help to auto generate id for the table.
   */
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 40 })
  email: string;

  @Column({ type: 'enum', enum: ['male', 'female', 'unspecified'] })
  /**
   * m - male
   * f - female
   * u - unspecified
   */
  gender: string;

  @Column({ type: 'varchar', length: 40 })
  birth_date: string;

  @Column({ type: 'boolean' })
  is_active: boolean;

  @Column({ type: 'boolean' })
  is_admin: boolean;
}
