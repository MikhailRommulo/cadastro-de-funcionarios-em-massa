import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Employee {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({length: 65})
  name: string;

  @Column({length: 14})
  document: string;
}
