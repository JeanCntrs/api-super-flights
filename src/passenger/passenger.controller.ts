import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { PassengerDTO } from './dto/passenger.dto';
import { PassengerService } from './passenger.service';

@Controller('api/v1/passengers')
export class PassengerController {
    constructor(private readonly passengerService: PassengerService) { }

    @Post()
    create(@Body() passengerDTO: PassengerDTO) {
        return this.passengerService.create(passengerDTO);
    }

    @Get()
    findAll() {
        return this.passengerService.findAll()
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.passengerService.findOne(id);
    }
}
