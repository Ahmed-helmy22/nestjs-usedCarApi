import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from "@nestjs/common";
import { UsersService } from "./users.service";
import { randomBytes, scrypt as _scrypt } from "crypto";
import { promisify } from "util";

const scrypt = promisify(_scrypt);
@Injectable()
export class AuthService {
  constructor(private userService: UsersService) {}

  async signup(email: string, password: string) {
    const user = await this.userService.find(email);
    if (user.length)
      throw new BadRequestException("the email is already in use");
    const salt = randomBytes(8).toString("hex");
    const hashed = (await scrypt(password, salt, 32)) as Buffer;
    const hashedWithSalt = salt + "." + hashed.toString("hex");
    const createdUser = await this.userService.CreateUser(
      email,
      hashedWithSalt
    );
    return createdUser;
  }
  
  async signin(email: string, password: string) {
    const [user] = await this.userService.find(email);
    if (!user) throw new NotFoundException("invalid email or password");
    const [salt, storedhash] = user.password.split(".");
    const newHash = (await scrypt(password, salt, 32)) as Buffer;
    if (newHash.toString("hex") !== storedhash)
      new NotFoundException("invalid email or password");
    return user;
  }
}
