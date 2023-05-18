import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/entities/user.entity';
import { UsersModule } from './users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { GatewayModule } from './gateway/gateway.module';




@Module({
  imports: [
    ConfigModule.forRoot({
    isGlobal: true,
  }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'Password!#*)1380',
      database: 'requestdev',
      entities: [User],
      synchronize: true,
      logging: true,
    }),
    UsersModule,
    JwtModule.register({
      secret: 'your-secret-key', // Replace with your actual secret key
      signOptions: { expiresIn: '1h' }, // Set the token expiration time
    }),
    GatewayModule,
],

  controllers: [],
  providers: []
})
export class AppModule {}
