import { Reports } from "src/reports/reports.entity";
import {
  AfterInsert,
  AfterRemove,
  AfterUpdate,
  Column,
  PrimaryGeneratedColumn,
  Entity,
  OneToMany,
} from "typeorm";
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  email: string;
  @Column({enum : ['user' , 'admin'] , default : 'user'})
  role : string

  @Column()
  password: string;

//     ****** report class**reposrt instance of it
  @OneToMany(()=> Reports , report => report.user)
  reports : Reports[];

  @AfterInsert()
  logAfterCreate() {
    console.log(`the id of inserted user is ${this.id}`);
  }

  // @BeforeRemove()
  @AfterRemove()
  logAfterRemove() {
    console.log(this);
    console.log(`the id of removed user is ${this.id}`);
  }
  @AfterUpdate()
  logAfterUpdate() {
    console.log(`the id of updated user is ${this.id}`);
  }
}
