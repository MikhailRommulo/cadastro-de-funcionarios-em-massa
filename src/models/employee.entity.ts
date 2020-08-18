import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BeforeInsert
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

  @BeforeInsert()
  async hashedPassword(): Promise<void> {
    const first3LettersOfTheName = this.name.substring(0, 3);
    const first3LettersOfTheDocument = this.document.substring(0, 3);
    const passwordToHashed = `${first3LettersOfTheName}${first3LettersOfTheDocument}`;
    const hash = await bcrypt.hash(passwordToHashed, 10);
    this.password = hash;
  }
}
