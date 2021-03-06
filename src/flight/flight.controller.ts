import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PassengerService } from 'src/passenger/passenger.service';
import { FlightDTO } from './dto/flight.dto';
import { FlightService } from './flight.service';

@ApiTags('flights')
@Controller('api/v1/flights')
export class FlightController {
    constructor(
        private readonly flightService: FlightService,
        private readonly passengerService: PassengerService
    ) { }

    @Get()
    findAll() {
        return this.flightService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.flightService.findOne(id);
    }

    @Post()
    create(@Body() flightDTO: FlightDTO) {
        return this.flightService.create(flightDTO);
    }

    @Post(':flightId/passenger/:passengerId')
    async addPassenger(
        @Param('flightId') flightId: string,
        @Param('passengerId') passengerId: string
    ) {
        const passenger = await this.passengerService.findOne(passengerId);

        if (!passenger) {
            throw new HttpException('Passenger not found', HttpStatus.NOT_FOUND);
        }

        return this.flightService.addPassenger(flightId, passengerId);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() FlightDTO: FlightDTO) {
        return this.flightService.update(id, FlightDTO);
    }

    @Delete(':id')
    delete(@Param('id') id: string) {
        return this.flightService.delete(id);
    }
}
