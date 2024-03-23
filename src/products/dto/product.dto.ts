/* eslint-disable prettier/prettier */
import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";

export class CreateProductDto {
    @ApiProperty()
    @IsString()
    name: string;
    @ApiProperty()
    @IsString()
    description: string;
    @ApiProperty()
    @IsString()
    image: Express.Multer.File;
    @ApiProperty()
    @IsNumber()
    price: number;
    @ApiProperty()
    @IsString()
    category: string;
}
export class UpdateProductDto {
    @ApiProperty()
    @IsString()
    name: string;
    @ApiProperty()
    @IsString()
    description: string;
    @ApiProperty()
    @IsString()
    image: Express.Multer.File;
    @ApiProperty()
    @IsNumber()
    price: number;
    @ApiProperty()
    @IsString()
    category: string;
}

export class listDto {
    @ApiProperty({example: ""})
    @IsString()
    search: string;
    @ApiProperty({example: 1})
    @IsString()
    page: number;
    @ApiProperty({example: 10})
    @IsString()
    limit: number;
}