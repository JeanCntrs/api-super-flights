import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IPassenger } from 'src/common/interfaces/passenger.interface';
import { PASSENGER } from 'src/common/models/models';
import { PassengerDTO } from './dto/passenger.dto';

@Injectable()
export class PassengerService {
    constructor(@InjectModel(PASSENGER.name) private readonly model: Model<IPassenger>) { }

    async create(passengerDTO: PassengerDTO): Promise<IPassenger> {
        const newPassenger = new this.model(passengerDTO);

        return await newPassenger.save();
    }

    async findAll(): Promise<IPassenger[]> {
        return await this.model.find()
    }
}
