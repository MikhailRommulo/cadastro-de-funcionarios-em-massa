import { AddressOfEmployee } from './addressOfEmployee.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BeforeInsert,
  ManyToOne
} from "typeorm";
import * as bcrypt from 'bcrypt';
import { Exclude } from 'class-transformer';
@Entity()
export class Employee {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({length: 65})
  name: string;

  @Column({length: 14})
  document: string;

  @Exclude({ toPlainOnly: true})
  @Column({length: 60})
  password: string;

  @Exclude({ toPlainOnly: true})
  @Column({default: false})
  isCustomPassword: boolean;

  @ManyToOne(() => AddressOfEmployee, (addressOfEmployee: AddressOfEmployee) => addressOfEmployee.employees, {cascade: ['insert','remove','update']})
  addressOfEmployee: AddressOfEmployee;

  @BeforeInsert()
  async hashedPassword(): Promise<void> {
    if (!this.isCustomPassword) {
      const first3LettersOfTheName = this.name.substring(0, 3);
      const first3LettersOfTheDocument = this.document.substring(0, 3);
      const passwordToHashed = `${first3LettersOfTheName}${first3LettersOfTheDocument}`;
      const hash = await bcrypt.hash(passwordToHashed, 10);
      this.password = hash;
    }
  }
}
