import { Injectable, NotFoundException } from '@nestjs/common';

import { InjectModel } from '@nestjs/mongoose';
 
import { Product } from './product.model';
import  {Model}  from 'mongoose';


@Injectable()
export class ProductsService {
  private products: Product[] = [];

 constructor(@InjectModel('Product') private readonly productSchema:Model<Product>) {}

 async insertProduct(title: string, desc: string, price: number) {
    
    const newProduct = new this.productSchema({
      title:title,
      description:desc,
      price:price,
    })

   const result = await newProduct.save();
   console.log(result); 

  //  return 'prodId';
  //  return newProduct;
  // res.send({
  //   newProduct
  // });

  }
  
  // async getProductById(:id){
  //   const getSingleUser = await this.productSchema.findOne()
  // }

 async getProducts() {
    const alluser = await this.productSchema.find();
    console.log(alluser);
    return alluser;
  }

  getSingleProduct(productId: string) {
    const product = this.findProduct(productId)[0];
    return { ...product };
  }

  updateProduct(productId: string, title: string, desc: string, price: number) {
    const [product, index] = this.findProduct(productId);
    const updatedProduct = { ...product };
    if (title) {
      updatedProduct.title = title;
    }
    if (desc) {
      updatedProduct.description = desc;
    }
    if (price) {
      updatedProduct.price = price;
    }
  //  this.products[index] = updatedProduct;
  }

  deleteProduct(prodId: string) {
      const index = this.findProduct(prodId)[1];
      this.products.splice(index, 1);
  }

  private findProduct(id: string): [Product, number] {
    const productIndex = this.products.findIndex(prod => prod.id === id);
    const product = this.products[productIndex];
    if (!product) {
      throw new NotFoundException('Could not find product.');
    }
    return [product, productIndex];
  }
}


