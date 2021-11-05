import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { FlightDTO } from './dto/flight.dto';
import { FlightService } from './flight.service';

@Controller('api/v1/flights')
export class FlightController {
    constructor(private readonly flightService: FlightService) { }

    @Post()
    create(@Body() flightDTO: FlightDTO) {
        return this.flightService.create(flightDTO);
    }

    @Get()
    findAll() {
        return this.flightService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.flightService.findOne(id);
    }
}
