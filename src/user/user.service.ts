import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/entities/user.entity';
import * as bcrypt from 'bcrypt'
import { CreateUserDto } from 'src/user/dto/user.dto';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
    ) { }


    async getAllUsers(): Promise<User[]> {
        const users = await this.userRepository.find()
        return users
    }
    //userd for auth login
    async findOne(data: Partial<User>): Promise<User> {
        const user = await this.userRepository.findOneBy({email: data.email})
        if (!user) {
            throw new UnauthorizedException('Could not find user')
        }

        return user
    }

    async findById(id: number): Promise<User>{
        const user = await this.userRepository.findOneBy({id: id})
        return user
    }

    async createUser(userDto: CreateUserDto): Promise<User>{
        const salt = await bcrypt.genSalt();
        //app password validation 
        userDto.password = await bcrypt.hash(userDto.password, salt);
        const user = await this.userRepository.save(userDto)
        delete user.password
        return user;
    }
}
