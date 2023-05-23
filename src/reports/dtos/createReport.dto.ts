import { IsOptional, IsString , Min , Max , IsNumber , IsLatitude , IsLongitude } from "class-validator";

export class CreateReportsDto {
@IsNumber()
@Min(0)
@Max(1000000)
price : number

@IsString()
make : string;

@IsOptional()
model : string; 
@IsNumber()
@Min(1930)
@Max(1000000)
year : number;
@IsLongitude()
lng : number;
@IsLatitude()
lat : number;

@IsNumber()
@Min(0)
@Max(1000000)
kilometer : number;
}