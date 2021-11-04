export interface IFlight extends Document {
    readonly pilot: string;
    readonly airplane: string;
    readonly destinationCity: string;
    readonly flightDate: Date;
}