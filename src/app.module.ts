import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmployeeModule } from './employee/employee.module';
import { Employee } from './employee/employee.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mongodb',
      url: 'mongodb://localhost:27017/employee_db',
      database: 'employee_db',
      entities: [Employee],
      synchronize: true,
    }),
    EmployeeModule,
  ],
})
export class AppModule {}