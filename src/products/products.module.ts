import { Module } from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';


import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { productSchema } from './product.model';

import { UserModule } from 'src/user/user.module';

@Module({
    imports:[ UserModule,
        MongooseModule.forFeature([{name:'Product',schema:productSchema}])],
    controllers: [ProductsController],
    providers: [ProductsService],

})
export class ProductsModule {}
