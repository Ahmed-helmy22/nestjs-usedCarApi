import { Expose } from 'class-transformer';
	
export class ReportAfterAprrove {
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
approved : boolean
} 