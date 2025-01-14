import { BadRequestException, ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt'
import { CreateUserDto } from 'src/user/dto/user.dto';

@Injectable()
export class UserService {
    constructor(
        private prisma: PrismaService
    ) { }


    async updateHashedRefreshToken(userId: number, hashedRefreshToken: string) {
        return await this.prisma.user.update({
            where: {
                id: userId
            },
            data: {
                 hashedRefreshToken
            }
        })
    }


    async findByEmail(email: string): Promise<User>{

        console.log("email", email)
        const user = await this.prisma.user.findUnique({
            where: {
                email: email
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

        const isUser = await this.findByEmail(userDto.email)

        if (isUser !== null) {
            throw new ConflictException("This user already exists!!")
        }
        try {
            
            const salt = await bcrypt.genSalt();
            //app password validation 
            userDto.password = await bcrypt.hash(userDto.password, salt);
            console.log(userDto)
            const user = await this.prisma.user.create({ data: userDto })
            delete user.password
            return user;
        } catch (error) {
            throw new BadRequestException("User could not be created", error)
        }
    }



    async remove(userId: number) {
        await this.prisma.user.delete({
            where: {
                id: userId
            }
        })
    }
}
