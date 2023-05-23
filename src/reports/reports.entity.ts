 import { User } from 'src/users/user.entity'
import { Column , PrimaryGeneratedColumn , Entity, ManyToOne} from 'typeorm'

@Entity()
export class Reports {
@PrimaryGeneratedColumn()
id : number
@Column()
price : number;
@Column({default : false })
approved : boolean

@Column()
make : string;

@Column()
model : string; 

@Column()
year : number;

@Column()
lng : number;

@Column()
lat : number;

@Column()
kilometer : number

@ManyToOne(()=> User , user => user.reports)
user : User
}