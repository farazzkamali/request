import { Injectable } from "@nestjs/common";
import { CreateAccountInput, CreateAccountOutput } from "./dtos/create-acoount.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./entities/user.entity";
import { Repository } from "typeorm";
import { LoginInput, LoginOutput } from "./dtos/login.dto";
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class UsersService {
    @InjectRepository(User) private readonly users: Repository<User>
    constructor(private readonly jwtService: JwtService) {}


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

    async login(loginInput:LoginInput): Promise<LoginOutput>{
        try {
            const user = await this.users.findOne({where:{username: loginInput.username}});
            if(!user){
                return{
                    ok:false,
                    error:"User not found"
                }
            }
            const passwordCorrect = await user.checkPassword(loginInput.password);
            if(!passwordCorrect){
                return{
                    ok:false,
                    error:"Wrong password"
                }
            }
            const token = await this.jwtService.signAsync({id:user.id});
            return{
                ok:true,
                token
            }
        } catch (error) {
            return{
                ok:false,
                error:"couldn't login"
            }
        }
    }
}