import { Injectable } from "@nestjs/common";
import { CreateAccountInput, CreateAccountOutput } from "./dtos/create-acoount.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./entities/user.entity";
import { Repository } from "typeorm";


@Injectable()
export class UsersService {
    @InjectRepository(User) private readonly users: Repository<User>

    async createAccount(createAccountInput:CreateAccountInput): Promise<CreateAccountOutput>{
        try {
            const exists = await this.users.findOne({where:{username: createAccountInput.username}});
            if(exists){
                return{
                    ok:false,
                    error:"There is a user with that username already"
                }
            }
            await this.users.save(this.users.create(createAccountInput));
            return{
                ok:true
            }
        } catch (error) {
            return{
                ok:false,
                error:"couldn't create account"
            }
        }
    }
}