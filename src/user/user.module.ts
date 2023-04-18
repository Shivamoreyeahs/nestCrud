import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { userSchema } from './schema/user.schema';
import { JwtModule } from '@nestjs/jwt';

import * as dotenv from 'dotenv';
dotenv.config();

@Module({
  imports:[ MongooseModule.forFeature([{ name: 'User', schema: userSchema }]),
  JwtModule.register({        //registering the JwtModule as global to make things easier for us.
    global: true,              // This means that we don't need to import the JwtModule anywhere else in our application.
    secret:process.env.MYTOKEN,
    // secret:"MY-TOKEN",
    signOptions: { expiresIn: '30 minutes' },
  })],
  controllers: [UserController],
  providers: [UserService]
})
export class UserModule {}
