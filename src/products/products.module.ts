/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductSchema, product } from './schema/products.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: product.name, schema: ProductSchema }])],
  controllers: [ProductsController],
  providers: [ProductsService]
})
export class ProductsModule { }
