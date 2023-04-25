import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Diary {
  @PrimaryGeneratedColumn()
  id: string;
  @Column()
  title: string;
  @Column()
  content: string;
  @Column()
  dateCreated: string;
  @Column()
  dateModified: string;
}
