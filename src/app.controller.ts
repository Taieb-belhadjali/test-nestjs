import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmployeeModule } from './employee/employee.module';


@Module({
imports: [
TypeOrmModule.forRoot({
type: 'mongodb',
url: 'mongodb://localhost:27017/employee_db',
database: 'employee_db',
entities: [__dirname + '/**/*.entity{.ts,.js}'],
synchronize: true,
}),
EmployeeModule,
],
})
export class AppModule {}