import { Injectable, NestMiddleware, NotFoundException } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";
import { UsersService } from "../users.service";
import { User } from "../user.entity";


// tell express definetion file that ...if it exist add currentUser to the interface 
declare global {
    namespace Express {
        interface Request {
            currentUser? : User
        }
    }
}

@Injectable()
export class CurrentUserMiddleware implements NestMiddleware { 
    constructor(private userService : UsersService){}
   async use(req: Request, res: Response, next: NextFunction) {
        const {userId} = req.session;
        if(userId) {
        const currentUser = await this.userService.findone(userId);
        ////@ts-ignore or use this ignore
        if(currentUser) req.currentUser = currentUser;
        }
        next()
    }
}