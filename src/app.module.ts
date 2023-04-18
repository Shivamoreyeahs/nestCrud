// import * as dotenv from 'dotenv';
// dotenv.config();
import { Module } from '@nestjs/common';

import { AppService } from './app.service';

import {InjectConnection, MongooseModule} from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { ProductsModule } from './products/products.module';
// import { UserModule } from './user/user.module';
import { Connection } from 'mongoose';


import { ConfigModule } from '@nestjs/config'; //this package is for config module proess.env




@Module({
  imports: [
    ConfigModule.forRoot(),     //this package is for config module proess.env 
    ProductsModule,
    // MongooseModule.forRoot('mongodb://0.0.0.0:27017',{dbName:'nestcrudShiv'}),
    MongooseModule.forRoot(process.env.mongoUrl), 
      
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  @InjectConnection() private connection: Connection;

  onModuleInit() {
    // execute logic + access mongoDB via this.connection
  console.log('Connected to the MongoDB Successfully...');
  }
}
 





