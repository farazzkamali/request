import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./entities/user.entity";
import { UsersService } from "./users.service";
import { UsersController } from "./users.controller";
import { JwtModule } from "@nestjs/jwt";



@Module({
    imports: [TypeOrmModule.forFeature([User]), JwtModule.register({
        secret: 'your-secret-key', // Replace with your actual secret key
      signOptions: { expiresIn: '1h' }, 
    })],
    controllers: [UsersController],
    providers: [UsersService],
  })
  export class UsersModule {}