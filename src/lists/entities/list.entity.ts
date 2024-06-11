import { Entity , Column , PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class List {
  @PrimaryGeneratedColumn()
  id:number;
  
  @Column({length: 100})
  text:string;

  @Column()
  date:string;

  @Column({length : 100})
  list:string;
}
