import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Employee } from './employee.entity';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { ObjectId } from 'mongodb';
@Injectable()
export class EmployeeService {
constructor(
@InjectRepository(Employee)
private readonly employeeRepo: Repository<Employee>,
) {}
async create(dto: CreateEmployeeDto): Promise<Employee> {
if (new Date(dto.startTime) >= new Date(dto.endTime)) {
throw new BadRequestException('Start date must be before end date');
}
return this.employeeRepo.save(dto);
}

async findOne(id: string): Promise<Employee> {
const employee = await this.employeeRepo.findOne({ where: { id: new
ObjectId(id) } });
if (!employee) throw new NotFoundException('Employee not found');
return employee;
}
findAll(): Promise<Employee[]> {
return this.employeeRepo.find();
}
async update(id: string, dto: UpdateEmployeeDto): Promise<Employee> {
const employee = await this.findOne(id);
if (dto.startTime && dto.endTime && new Date(dto.startTime) >= new Date(dto.endTime)) {
throw new BadRequestException('Start date must be before end date');
}
Object.assign(employee, dto);
return this.employeeRepo.save(employee);
}
async remove(id: string) {
const employee = await this.findOne(id);
return this.employeeRepo.delete(employee.id);
}
calculateWorkedHours(employee: Employee): number {
const diff = new Date(employee.endTime).getTime() - new
Date(employee.startTime).getTime();
return diff / (1000 * 60 * 60);
}
calculateSalary(employee: Employee): number {
const hours = this.calculateWorkedHours(employee);
return hours * employee.hourlyRate;
}
calculateTax(employee: Employee): number {
return this.calculateSalary(employee) * 0.09;

}
}

function newDate(endTime: any) {
    throw new Error('Function not implemented.');
}
