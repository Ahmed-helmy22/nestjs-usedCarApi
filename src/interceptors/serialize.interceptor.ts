import {UseInterceptors , NestInterceptor ,ExecutionContext, CallHandler} from '@nestjs/common'
import {Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { plainToClass } from 'class-transformer';


interface classConstructor{
    new (...args : any[]) : {}
}

// here we apply the function as decorator
export const Serializer = function(dto : classConstructor){
    return UseInterceptors(new SerializeInterceptor(dto)) 
}


class SerializeInterceptor implements NestInterceptor { 
    constructor(private dto : classConstructor){}
    intercept(context: ExecutionContext, handler: CallHandler<any>): Observable<any> | Promise<Observable<any>> {

        return handler.handle().pipe(
            map((data : any)=>{
                return plainToClass(this.dto , data , {
                    excludeExtraneousValues : true
                })

        }));
        
    }
}