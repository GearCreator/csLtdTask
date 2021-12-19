import { Car } from "./car.model";

export class Owner {
    id?: number
    firstName: string = '';
    secondName: string = '';
    middleName: string = '';
    cars: Car[] = []
}