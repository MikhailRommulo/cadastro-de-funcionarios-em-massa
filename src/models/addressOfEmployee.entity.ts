import { Employee } from './employee.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";

@Entity()
export class AddressOfEmployee {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({length: 9})
  zipCode: string;

  @Column({length: 30})
  country: string;

  @Column({length: 30})
  stateOrProvince: string;

  @Column({length: 30})
  city: string;

  @Column({length: 30})
  neighborhood: string;

  @Column({length: 70})
  publicPlace: string;

  @Column({length: 5})
  numberOfThePublicPlace: string;

  @Column({length: 20, nullable: true})
  complement: string;

  @OneToMany(() => Employee, (employee: Employee) => employee.addressOfEmployee)
  employees: Employee[]
}
