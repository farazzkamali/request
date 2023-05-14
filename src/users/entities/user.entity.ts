import { InternalServerErrorException } from "@nestjs/common";
import { BeforeInsert, BeforeUpdate, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import * as bcrypt from 'bcrypt';
import { IsEmail, IsString } from "class-validator";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @IsEmail()
    email: string;

    @Column()
    @IsString()
    username: string;

    @Column()
    @IsString()
    password: string;

    @BeforeInsert()
    @BeforeUpdate()
    async hashPassword(): Promise<void> {
      if (this.password) {
        try {
          this.password = await bcrypt.hash(this.password, 10);
        } catch (error) {
          console.log(error);
          throw new InternalServerErrorException();
        }
      }
    }
    async checkPassword(aPassword: string): Promise<boolean> {
      try {
        const ok = await bcrypt.compare(aPassword, this.password);
        return ok;
      } catch (error) {
        console.log(error);
        throw new InternalServerErrorException();
      }
    }
  }
