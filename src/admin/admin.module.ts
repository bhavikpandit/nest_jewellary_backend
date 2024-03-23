/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AdminController } from './admin.controller';
import { ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AdminService } from './admin.service';
import { Admin, AdminSchema } from './schema/admin.schema';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      useFactory: (config: ConfigService) => {
        return {
          secretOrPrivateKey: 'bhavik2210',
          signOptions: {expiresIn: '1h'}
        }
      }
    }),
    MongooseModule.forFeature([{ name: Admin.name, schema: AdminSchema }])],
  controllers: [AdminController],
  providers: [AdminService]
})
export class AdminModule { }
