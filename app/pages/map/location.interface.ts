import {Employee} from './employee.interface';

export interface Location {
    latitude: number,
    longitude: number,
    employees: Employee[],
    name: string
}