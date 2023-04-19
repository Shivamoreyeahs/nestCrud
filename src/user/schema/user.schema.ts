import {Prop ,Schema,SchemaFactory} from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type userDocument =   Document;


@Schema({ timestamps: true })  //{ timestamps: true },  insite hta schema decorators 
export class User {

    @Prop()    //  @Prop({ required: true })
    name:string;
   
    @Prop({ required: true })   //This is a required property for the user Model 
    email:string;

    @Prop()
    password:string;

    @Prop()
    address:string;
}


export const userSchema = SchemaFactory.createForClass(User);
