import { Module } from '@nestjs/common';

import { AppService } from './app.service';

import {InjectConnection, MongooseModule} from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { ProductsModule } from './products/products.module';
import { UserModule } from './user/user.module';
import { Connection } from 'mongoose';

@Module({
  imports: [
    ProductsModule,
    MongooseModule.forRoot('mongodb://0.0.0.0:27017',{dbName:'nestcrudShiv'}),
    
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
 





