/* eslint-disable prettier/prettier */
import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { product } from './schema/products.schema';
import { Model } from 'mongoose';
import { CreateProductDto, UpdateProductDto, listDto } from './dto/product.dto';

@Injectable()
export class ProductsService {
    constructor(@InjectModel(product.name) private productModel: Model<product>) { }

    async create(createProductDto: CreateProductDto, file: Express.Multer.File) {
        console.log("file ==>", file)
        const { name } = createProductDto;
        const existProduct = await this.productModel.findOne({ name: name })
        console.log(existProduct)

        if (existProduct) {
            throw new BadRequestException('product already exist please add different product...')
        }
        const filepath = `${file.destination}/${file.originalname}`

        const custPrice = createProductDto.price * 1.05;
        const tax = custPrice * (1 + 0.2);

        const newProduct = {
            name: createProductDto.name,
            description: createProductDto.description,
            price: createProductDto.price,
            image: filepath,
            customerPrice: custPrice,
            taxPrice: tax

        }
        const product = await this.productModel.create(newProduct)
        console.log(product)
        return product;
    }

    async getProducts(listDto: listDto) {
        const { search, page, limit } = listDto;
        console.log(search)

        const query: any = {};
        if (search) {
            query.name = { $regex: search, $options: 'i' };
        }

        // if (isNaN(page) || isNaN(limit) || page < 1 || limit < 1) {
        //     throw new Error('Invalid page or limit');
        // }

        const offset = (page - 1) * limit;

        const products = await this.productModel
        .find(query)
        .skip(offset)
        .limit(limit)
        .exec();

        return products;
    }

    async update(id: string, updateProductDto: UpdateProductDto, file: Express.Multer.File) {
        console.log("file ==>", file)
        const filepath = `${file.destination}/${file.originalname}`
        const existproduct = await this.productModel.findById(id)
        console.log(existproduct)
        if (!existproduct) {
            throw new NotFoundException("product not found...")
        }

        const custPrice = updateProductDto.price * 1.05;
        const tax = custPrice * (1 + 0.2);

        const changes = {
            name: updateProductDto.name,
            description: updateProductDto.description,
            price: updateProductDto.price,
            image: filepath,
            customerPrice: custPrice,
            taxPrice: tax
        }
        console.log(changes)
        const product = await this.productModel.findByIdAndUpdate(id, changes)
        console.log(product)
        return product;
    }
}