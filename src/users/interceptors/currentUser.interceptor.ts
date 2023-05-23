// import { NestInterceptor,ExecutionContext , CallHandler , Injectable, NotFoundException } from '@nestjs/common';
// import { UsersService } from '../users.service';
// import { Observable } from 'rxjs';

// interceptor cant fetch current user because it is excuted after gaurds

// @Injectable()
// export class currentUserInterceptor implements NestInterceptor {
//     constructor(private userService : UsersService){}
//      async intercept(context: ExecutionContext, handler: CallHandler<any>) : Promise<Observable<any>>  
//      {
//         const request = context.switchToHttp().getRequest();
//         const {userId} = request.session || {};
//         if(userId){ 
//          const user = await this.userService.findone(userId)
//         if(user) request.currentUser = user;
//         }
//         return handler.handle()
//      }
// }
