import { IsDateString, IsNumber } from 'class-validator';


export class CreateEmployeeDto {
@IsDateString()
startTime: Date;


@IsDateString()
endTime: Date;


@IsNumber()
hourlyRate: number;
}