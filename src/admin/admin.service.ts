/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { BadRequestException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Admin } from './schema/admin.schema';
import { CreateAdminDto, LoginAdminDto, LogoutAdminDto } from './dto/admin.dto';


@Injectable()
export class AdminService {
    constructor(
        @InjectModel(Admin.name) private adminModel: Model<Admin>,
        private jwtService: JwtService,
        ) { }

    async getAll() {
        const users = await this.adminModel.find()
        return users;
    }
    
    async registerAdmin(createAdmin: CreateAdminDto) {
        const { email, password } = createAdmin
        const admin = await this.adminModel.findOne({ email: email })
        if (admin) {
            throw new BadRequestException("admin already exist...")
        }

        const hashedPassword = await bcrypt.hash(password, 10)
        console.log(hashedPassword)

        const newUser = {
            email: createAdmin.email,
            firstName: createAdmin.firstName,
            lastName: createAdmin.lastName,
            contact: createAdmin.contact,
            address: createAdmin.address,
            password: hashedPassword,
        }

        const newAdmin = await this.adminModel.create(newUser)
        console.log(newAdmin)
        return newAdmin;
    }
    
    async loginAdmin(loginAdmin: LoginAdminDto) {
        const { email, password } = loginAdmin
        const admin = await this.adminModel.findOne({ email: email })
        if (!admin) {
            throw new BadRequestException("user not found...")
        }

        const validPassword = await bcrypt.compare(password, admin.password)
        console.log(validPassword)

        if (!validPassword) {
            throw new BadRequestException("password is invalid...")
        }

        console.log("loggedIn admin ==>", admin)
        const token = this.jwtService.sign({ id: admin._id }, );


        admin.accessToken = token;
        await this.adminModel.updateOne({_id: admin.id}, {$set:{accessToken: token}})
        console.log("user ==>", admin)
        return {
            statusCode: HttpStatus.OK,
            message: 'Admin loggedin successfully...',
            admin
        };
    }

    async logoutAdmin(logoutAdmin: LogoutAdminDto){
        const user = await this.adminModel.findOne({_id: logoutAdmin.id})
        console.log("user==>", user)

        if(!user){
            throw new BadRequestException("user not found..")
        }
        await this.adminModel.updateOne({_id: logoutAdmin.id}, {$set:{accessToken: ""}})
        console.log("logout user ==>", user)
        return{
            statusCode: HttpStatus.OK,
            message: 'Admin logout successfully...',
        };
    }

    async validateToken(token: string) {
        try {
            return this.jwtService.verify(token);
        } catch (error) {
            return null;
        }
    }

}
