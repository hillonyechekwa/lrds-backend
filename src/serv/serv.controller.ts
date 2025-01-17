import { Controller, Body, Post, Request, HttpException, HttpStatus, Get, Param, ParseIntPipe, Delete, Put, UseGuards } from '@nestjs/common';
import { ServDto } from './dto/serv.dto';
import { UpdateServDto } from './dto/updateServ.dto';
import { ServService } from './serv.service';
// import { ServiceEntity } from 'src/entities/service.entity';
import { Service } from '@prisma/client';
import { JwtAuthGuard } from 'src/guards/jwt.guard';
// import { RolesGuard } from 'src/guards/role.guard';
// import { Roles } from 'src/decorators/roles.decorator';
// import { Role } from 'src/enums/role.enum';
// import { RefreshAuthGuard } from 'src/guards/refresh.guard';
// import { Pagination } from 'nestjs-typeorm-paginate';


@Controller('serv')
export class ServController {
    constructor(
        private readonly servService: ServService
    ){}

    // @Roles(Role.STYLIST)
    // @UseGuards(RolesGuard)
    @UseGuards(JwtAuthGuard)
    @Post()
    createService
        (
            @Body() createServDto: ServDto,
            @Request()
            request
    ): Promise<Service> {
        try {
           
            const userId = request.user['userId']
            createServDto.stylistId = userId
            // console.log(createServDto)
            return this.servService.createService(createServDto)
        } catch (error) {
            throw new HttpException(
                'server error',
                HttpStatus.INTERNAL_SERVER_ERROR,
                {
                    cause: error
                }
            )
        }
        
    }
    

    //Get One
    @Get(":id")
    findOne(@Param('id', new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE })) id: number) {
        return this.servService.findOne(id)
    }


    //Get All from stylist
    // @Get()
    // findAll(
    //     @Query('page', new DefaultValuePipe(1), ParseIntPipe)
    //     page = 1,
    //     @Query('limit', new DefaultValuePipe(10), ParseIntPipe)
    //     limit=10,
    // ): Promise<Pagination<Service>>{
    //     limit = limit > 100 ? 100 : limit
    //     return this.servService.paginate({
    //         page,
    //         limit
    //     })
    // }



    //Update by a stylist alone
    @Put(":id")
    update(
        @Param("id", ParseIntPipe) id: number,
        @Body() updateServDto: UpdateServDto
    ): Promise<Service>{
        return this.servService.update(id, updateServDto)
    }


    @Delete(":id")
    remove(@Param('id', ParseIntPipe) id: number): Promise<Service> {
        return this.servService.remove(id)
    }
}
