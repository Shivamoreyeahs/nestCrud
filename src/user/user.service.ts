import { Injectable, NotFoundException, } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserInterface } from './interface/user.interface';
import { userDto } from './dto/user.dto';

// @Injectable()
// export class UserService {
//     getHello(): string {
//         return 'Hello Shivam From UserServices!';
//       }
// }

// constructor(@InjectModel(Cat.name) private catModel: Model<Cat>) {}

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private userModel: Model<UserInterface>) {}

// Register new user  
  async registerUser(userDto:userDto){
      const user = new this.userModel(userDto);
      console.log(user);
      return await user.save();
  }

// // Get user api
//  async getUser(){
//  return await this.userModel.find().exec();
//  }

// get user using try catch and exception filter 
async getUser(){
  const userData = await this.userModel.find();
  if(!userData || userData.length==0){
    throw new NotFoundException("User not found")
  }
  return userData;
}


//Get user by id
async getUserById(userId:string){
  const userData = await this.userModel.findById(userId);
  if(!userData){
    throw new NotFoundException(`User ${userId} not found`);
  }
  return userData;
}



//  UpdateUser by id 
async updateUser(userId:string,){
  const updateUser = await this.userModel.findByIdAndUpdate(userId);
  if(!updateUser){
    throw new NotFoundException(`User #${userId} not found`);
  }
  return updateUser;
}

} 



// async updateStudent(studentId: string, updateStudentDto: UpdateStudentDto): Promise<IStudent> {
//       const existingStudent = await        this.studentModel.findByIdAndUpdate(studentId, updateStudentDto, { new: true });
//      if (!existingStudent) {
//        throw new NotFoundException(`Student #${studentId} not found`);
//      }
//      return existingStudent;
//   }
