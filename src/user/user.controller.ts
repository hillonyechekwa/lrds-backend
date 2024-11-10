import { Controller, Delete, Get, Param, ParseIntPipe, Req, UseGuards} from '@nestjs/common';
import { UserService } from './user.service';
import { JwtAuthGuard } from 'src/guards/jwt.guard';
import { RolesGuard } from 'src/guards/role.guard';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/enums/role.enum';



@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {
        
    }

    //get all users
    @Get("all")
    getAllUsers() {
        return this.userService.getAllUsers()
    }

    @Roles(Role.USER)
    @UseGuards(RolesGuard)
    @UseGuards(JwtAuthGuard)
    @Delete()
    delete(@Req() req) {
        //* add a confirmation feature before the delete action is taken.
        const userId = req.user.userId
        return this.userService.remove(userId)
        //redirect to home page or something
    }
    
}


