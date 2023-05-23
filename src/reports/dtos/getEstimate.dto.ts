import {  IsString , IsNumber , IsLatitude , IsLongitude } from "class-validator";

import {Transform} from 'class-transformer';

export class GetEstimateDto {
@IsString()
make : string;

@IsString()
model : string; 

@Transform(({value})=> parseInt(value))
@IsNumber()
year : number;

@Transform(({value})=> parseFloat(value))
@IsLongitude()
lng : number;

@Transform(({value})=> parseFloat(value))
@IsLatitude()
lat : number;

@Transform(({value})=> parseInt(value))
@IsNumber()
kilometer : number;
}