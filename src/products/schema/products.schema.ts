/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type ProductDocument = HydratedDocument<product>

@Schema({ timestamps: true })
export class product {
    @Prop()
    name: string;

    @Prop()
    description: string;

    @Prop()
    price: number;

    @Prop()
    image: string;

    @Prop()
    category: string;

    @Prop()
    customerPrice: number;

    @Prop()
    taxPrice: number
}

export const ProductSchema = SchemaFactory.createForClass(product)