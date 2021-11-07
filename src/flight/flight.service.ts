import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IFlight } from 'src/common/interfaces/flight.interface';
import { FLIGHT } from 'src/common/models/models';
import { FlightDTO } from './dto/flight.dto';
import * as moment from 'moment'
import axios from 'axios';
import { ILocation } from 'src/common/interfaces/location.interface';
@Injectable()
export class FlightService {
    constructor(@InjectModel(FLIGHT.name) private readonly model: Model<IFlight>) { }

    async findAll(): Promise<IFlight[]> {
        return await this.model.find().populate('passengers');
    }

    async findOne(id: string): Promise<IFlight> {
        const flight = await this.model.findById(id).populate('passengers');
        const location: ILocation = await this.getLocation(flight.destinationCity);

        return flight;
    }

    async create(flightDTO: FlightDTO): Promise<IFlight> {
        const newFlight = new this.model(flightDTO);

        return await newFlight.save();
    }

    async addPassenger(flightId: string, passengerId: string): Promise<IFlight> {
        return await this.model.findByIdAndUpdate(flightId, {
            $addToSet: { passengers: passengerId }
        },
            { new: true }
        ).populate('passengers');
    }

    async update(id: string, flightDTO: FlightDTO): Promise<IFlight> {
        return await this.model.findByIdAndUpdate(id, flightDTO, { new: true });
    }

    async delete(id: string) {
        await this.model.findByIdAndDelete(id);

        return { status: HttpStatus.OK, message: 'deleted' }
    }

    async getLocation(destinationCity: string): Promise<ILocation> {
        const { data } = await axios.get(`https://www.metaweather.com/api/location/search/?query=${destinationCity}`);

        return data[0];
    }
}
