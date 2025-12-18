import { Entity, ObjectIdColumn, ObjectId, Column } from 'typeorm';


@Entity()
export class Employee {
@ObjectIdColumn()
id: ObjectId;


@Column()
startTime: Date;


@Column()
endTime: Date;


@Column()
hourlyRate: number;
}