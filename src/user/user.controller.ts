import { Controller, Get, Post, Patch, Delete, Param, Body} from '@nestjs/common';
import { CreateUserDto } from 'src/user/dto/user.dto';
import { UserService } from './user.service';



@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {
        
    }

    //get all users
    @Get()
    getAllUsers() {
        return this.userService.getAllUsers()
    }
    
    //Update
    @Patch()
    updateUser() {
        return "user updated"
    }

    //Delete
    @Delete()
    deleteUser() {
        return "user deleted"
    }
}


