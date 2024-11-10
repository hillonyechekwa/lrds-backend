import { Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt'
import { CreateUserDto } from 'src/user/dto/user.dto';

@Injectable()
export class UserService {
    constructor(
        private prisma: PrismaService
    ) { }


    async findByEmail(email: string): Promise<User>{
        const user = await this.prisma.user.findUnique({
            where: {
                email
            }
        })
        return user
    }

    async getAllUsers(): Promise<User[]> {
        const users = await this.prisma.user.findMany()
        return users
    }
    //userd for auth login
    async findOne(data: Partial<User>): Promise<User> {
        const user = await this.prisma.user.findUnique({ where: { email: data.email } })
        if (!user) {
            throw new UnauthorizedException('Could not find user')
        }

        return user
    }

    async findById(id: number): Promise<User>{
        const user = await this.prisma.user.findUnique({ where: { id: id } })
        return user
    }

    async createUser(userDto: CreateUserDto): Promise<User>{
        const salt = await bcrypt.genSalt();
        //app password validation 
        userDto.password = await bcrypt.hash(userDto.password, salt);
        const user = await this.prisma.user.create({ data: userDto })
        delete user.password
        return user;
    }
}
