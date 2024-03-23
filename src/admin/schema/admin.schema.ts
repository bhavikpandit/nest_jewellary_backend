/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";


export type AdminDocument = HydratedDocument<Admin>

@Schema({ timestamps: true })
export class Admin {
    @Prop()
    firstName: string;
    @Prop()
    lastName: string;
    @Prop()
    email: string;
    @Prop()
    contact: number;
    @Prop()
    password: string;
    @Prop()
    address: string;
    @Prop()
    accessToken: string;
}

export const AdminSchema = SchemaFactory.createForClass(Admin)