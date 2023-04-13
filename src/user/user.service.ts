import { Injectable, NotFoundException,BadRequestException ,HttpException, HttpStatus,} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserInterface } from './interface/user.interface';
import { userDto } from './dto/user.dto';
import { updateUserDto } from './dto/updateUser.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '../auth/auth.guard';

// @Injectable()
// export class UserService {
//     getHello(): string {
//         return 'Hello Shivam From UserServices!';
//       }
// }

// constructor(@InjectModel(Cat.name) private catModel: Model<Cat>) {}


// Here, we used the @InjectModel() decorator to inject the userModel into the UsersService.
@Injectable()
export class UserService {
  
  constructor(@InjectModel('User') private userModel: Model<UserInterface>, private jwtService: JwtService) {}   //JwtService provider


  async getUserByEmail(email: string) {
    return this.userModel.findOne({
        email
      })
      .exec();
  }


  // Register new user  
  async registerUser(userDto: userDto,) {

    const user = new this.userModel(userDto);
// console.log(user);
    // check if user exists
    const checkUser = await this.getUserByEmail(user.email);
    // console.log(checkUser)
    if (checkUser) {
      throw new BadRequestException();
    }
   
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password,salt);
    console.log(user);
    return await user.save();
  }




  // // Get user api
  //  async getUser(){
  //  return await this.userModel.find().exec();
  //  }

  // get user using try catch and exception filter
  async getUser() {
    const userData = await this.userModel.find();
    if (!userData || userData.length == 0) {
      throw new NotFoundException('User not found');
    }
    return userData;
  }



  async getUsers({ email, password }) {
    return this.userModel.findOne({
      email,
      password,
    });
  }









  //Get user by id
  async getUserById(userId: string) {
    const userData = await this.userModel.findById(userId);
    if (!userData) {
      throw new NotFoundException(`User ${userId} not found`);
    }
    return userData;
  }

  //  UpdateUser by id

  async updateUser(userId: string, updateUserDto: updateUserDto) {
    console.log(userId);
    const updateUser = await this.userModel.findByIdAndUpdate(userId,updateUserDto,{ new: true },);
    // console.log(updateUser,"THis is service updateuser ")
    if (!updateUser) {
      throw new NotFoundException(`User #${userId} not found`);
    }
    return updateUser;
  }

  // delete user from id
  async deleteUserbyId(userId: string) {
    const deleteUser = await this.userModel.findByIdAndDelete(userId);

    if (!deleteUser) {
      throw new NotFoundException(`User #${userId} not found`);
    }
    return deleteUser;
  }


  async loginUser(UserDTO: userDto) {
    const { email, password } = UserDTO;
    const user = await this.userModel.findOne({ email });
    if (!user) {
      throw new HttpException('user doesnt exists', HttpStatus.BAD_REQUEST);
    }
    if (await bcrypt.compare(password, user.password)) {

      const payload = { username: user.email, sub: user._id };
      const  access_token = await this.jwtService.signAsync(payload)      //signAsync() function to generate our JWT 
        // console.log(access_token, 'access_token');
     
     return {access_token, user};
    } 
    else {
      throw new HttpException('invalid credential', HttpStatus.BAD_REQUEST);
    }  
  }


}
