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
  UseGuards,
} from '@nestjs/common';
// import * as bcrypt from 'bcrypt';
// import { AuthGuard } from '@nestjs/passport';



import { UserService } from './user.service';
import { userDto } from './dto/user.dto';
import { updateUserDto } from './dto/updateUser.dto';
import { response } from 'express';
import { AuthGuard } from '../auth/auth.guard';
// import { LoginDTO } from './dto/login.dto';

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
  // @UseGuards(AuthGuard('jwt'))
  @Get('/:id')
  @UseGuards(AuthGuard)
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
  // @UseGuards(AuthGuard('jwt'))
  @Put('/update/:id')
  @UseGuards(AuthGuard)
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
  @UseGuards(AuthGuard)
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

// // Login user 
  @Post('/login')
  async login(@Body() userDto: userDto) {
    const user = await this.userServices.loginUser(userDto);
    // const payload = {
    //   email: user.email,
    // };
    // const token = await this.authService.signPayload(payload);
    // return { user, token};
    return user;
  }



} 
