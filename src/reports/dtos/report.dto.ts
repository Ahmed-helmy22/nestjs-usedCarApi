import { Expose, Transform } from 'class-transformer';
	
export class reportDto {
@Expose()
price : number ;
@Expose()
make : string;
@Expose()
model : string;
@Expose()
year : number ;
@Expose()
lng : number;
@Expose()
lat : number ;
@Expose()
kilometer : number
@Expose()
approve : boolean

// take the report entity and extract user.id and call it userId
@Transform(({obj})=> obj.user.id)
@Expose()
userId : number
} 