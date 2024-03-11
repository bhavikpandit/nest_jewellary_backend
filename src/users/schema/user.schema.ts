/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";


export type UserDocument = HydratedDocument<User>

@Schema({ timestamps: true })
export class User {
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
}

export const UserSchema = SchemaFactory.createForClass(User)