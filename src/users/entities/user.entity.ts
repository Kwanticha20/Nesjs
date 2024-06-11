import { Column , Entity , PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id:number;

  @Column({length:100})
  username:string;

  @Column()
  password:string;
}
