import { Body, Controller, Get, Post } from "@nestjs/common";
import { UsersService } from "./users.service";
import { CreateAccountInput, CreateAccountOutput } from "./dtos/create-acoount.dto";


@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}


  @Get('/register')
  getRegisterPage() {
    return 'This is the register page';
  }



    @Post('/register')
    createAccount(@Body() createAccountInput: CreateAccountInput): Promise<CreateAccountOutput> {
        return this.usersService.createAccount(createAccountInput);
    }
}