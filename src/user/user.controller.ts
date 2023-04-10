import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Res,
  Body,
  HttpStatus,
  Param,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';


import { UserService } from './user.service';
import { userDto } from './dto/user.dto';
import { updateUserDto } from './dto/updateUser.dto';
import { response } from 'express';

@Controller('user')
export class UserController {
  constructor(private readonly userServices: UserService) {}

  @Post('/crateUser')
  newUser(@Res() res,
   @Body() userDto: userDto,
   @Body('email') email: string,
   @Body('password') password: string,) {

    const user = this.userServices.registerUser(userDto);
    return res.status(HttpStatus.OK).json({
      response: { 'User added ': user },
    });
  }

  // @Get('/getUser')
  // async getUser(){
  //   return this.userServices.getUser();
  // }

  //// get user using try catch and exception filter
  @Get('/getUser')
  async getUser(@Res() response) {
    try {
      const userData = await this.userServices.getUser();
      return response
        .status(HttpStatus.OK)
        .json({ message: 'All users found successfully', userData });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  // // GEt user by id
  @Get('/:id')
  async getUserById(@Res() response, @Param('id') userId: string) {
    try {
      const userById = await this.userServices.getUserById(userId);
      return response
        .status(HttpStatus.OK)
        .json({ message: 'User found successfully with his ID...', userById });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  //   Update User with ID
  @Put('/update/:id')
  async updateUser(
    @Res() response,
    @Param('id') userId: string,
    @Body() updateUserDto: updateUserDto,
  ) {
    // console.log(response)
    try {
      const findUser = await this.userServices.updateUser(
        userId,
        updateUserDto,
      );
      // console.log(findUser,"THis is controller user")
      return response
        .status(HttpStatus.OK)
        .json({ message: 'User updated successfully...', findUser });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  //Delet user api
  @Delete('/delete/:id')
  async deleteUserbyId(@Res() response, @Param('id') userId: string) {
    try {
      const deleteUser = await this.userServices.deleteUserbyId(userId);
      return response
        .status(HttpStatus.OK)
        .json({ message: 'User deleted successfully...', deleteUser });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }
}
