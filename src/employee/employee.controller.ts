import { Controller, Post, Body, Get, Param, Put, Delete } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
@Controller('employees')
export class EmployeeController {
constructor(private readonly service: EmployeeService) {}
@Post()
create(@Body() dto: CreateEmployeeDto) {
return this.service.create(dto);
}
@Get()
findAll() {
return this.service.findAll();
}
@Get(':id')
findOne(@Param('id') id: string) {
return this.service.findOne(id);
}
@Put(':id')
update(@Param('id') id: string, @Body() dto: UpdateEmployeeDto) {
return this.service.update(id, dto);
}
@Delete(':id')
remove(@Param('id') id: string) {
return this.service.remove(id);
}
@Get(':id/salary')

async salary(@Param('id') id: string) {
const emp = await this.service.findOne(id);
return {
workedHours: this.service.calculateWorkedHours(emp),
salary: this.service.calculateSalary(emp),
tax: this.service.calculateTax(emp),
};
}
}