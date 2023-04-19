import * as mongoose from 'mongoose';
import { Document } from 'mongoose';

export const productSchema = new mongoose.Schema({  //  💡 Alternatively, if you prefer not using decorators, you can define a schema manually. For example:
  title: {
     type: String, 
     required: true 
    },
  description: { 
    type: String,
     required: true
     },
  price: {
     type: Number,
      required: true
     },
  userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
},
{ timestamps: true }
);



export interface Product extends Document {
  id: string;
  title: string;
  description: string;
  price: number;
  userId:string;
}
