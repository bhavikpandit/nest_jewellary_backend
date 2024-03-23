/* eslint-disable prettier/prettier */
import { Controller, Post, UseInterceptors, HttpStatus, Body, UploadedFile, Param, Patch } from '@nestjs/common';
import { ProductsService } from './products.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags } from '@nestjs/swagger';
import { CreateProductDto, UpdateProductDto, listDto } from './dto/product.dto';
import { diskStorage } from 'multer';

@ApiTags('products')
@Controller('products')
export class ProductsController {

    constructor(private productService: ProductsService) { }

    @Post('create')
    @UseInterceptors(FileInterceptor('prod_image', {
        storage: diskStorage({
            destination: './uploads',
            filename: (req, file, cb) => {
                cb(null, file.originalname);
            },
        })
    }))
    async createProduct(@Body() body: CreateProductDto, @UploadedFile() file: Express.Multer.File) {
        const product = await this.productService.create(body, file)
        return {
            statusCode: HttpStatus.OK,
            message: 'product created successfully...',
            product: product,
        }
    }

    @Post()
    async getProducts(@Body() body: listDto) {
        console.log(body.search)
        const products = await this.productService.getProducts(body)
        return {
            statusCode: HttpStatus.OK,
            message: 'products get successfully',
            products: products,
            total: products.length,
        }
    }

    @Patch(':id')
    @UseInterceptors(FileInterceptor('prod_image', {
        storage: diskStorage({
            //9265505684
            destination: './uploads',
            filename: (req, file, cb) => {
                cb(null, file.originalname);
            },
        })
    }))
    async updateProduct(@Param('id') id: string,
        @Body() body: UpdateProductDto,
        @UploadedFile() file: Express.Multer.File
    ) {
        const product = await this.productService.update(id, body, file)
        return {
            statusCode: HttpStatus.OK,
            message: 'product updated successfully...',
            product: product,
        }
    }

}
