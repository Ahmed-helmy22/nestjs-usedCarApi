import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  Query,
  Delete,
  Patch,
  Session,
  UseGuards,
} from "@nestjs/common";
import { createUserDto } from "./dto/createUser.dto";
import { UsersService } from "./users.service";
import { Serializer } from "src/interceptors/serialize.interceptor";
import { UserDto } from "./dto/user.dto";
import { AuthService } from "./auth.sevice";
import { updateUserDto } from "./dto/update.user.dto";
import { AuthGaurd } from "src/Gaurds/auth.gaurds";
import { currentUser } from "./decorators/currentUser.decorator";

@Controller("auth")
//@UseGuards(AuthGaurd)
export class UsersController {
  constructor(
    private userService: UsersService,
    private authService: AuthService
  ) {}
  @Get("/who")
  @UseGuards(AuthGaurd) // inceptor of type gaurds
  whoAmI(@currentUser() user : UserDto) {
    return user
  }
  @Post("/signup")
  async signup(@Body() Body: createUserDto, @Session() session: any) {
    const user = await this.authService.signup(Body.email, Body.password);
    session.userId = user.id;
    return user;
  }

  @Post("/signin")
 @Serializer(UserDto)
  async signin(@Body() Body: createUserDto, @Session() session: any) {
    const user = await this.authService.signin(Body.email, Body.password);
    session.userId = user.id;
    return user;
  }

  @Post("/signout")
  @UseGuards(AuthGaurd)
  signout(@Session() session: any) {
    session.userId = null;
  }
  //@UseInterceptors(new SerializeInterceptor(UserDto))
  @Serializer(UserDto)
  @UseGuards(AuthGaurd)
  @Get("/user/:id")
  findUser(@Param("id") id: string) {
    return this.userService.findone(parseInt(id));
  }
  @Get()
  findAll(@Query("email") email: string) {
    return this.userService.find(email);
  }

  @Delete("/:id")
  removeUser(@Param("id") id: string) {
    return this.userService.remove(parseInt(id));
  }
  @Patch("/:id")
  updateUser(@Body() Body: updateUserDto, @Param("id") id: string) {
    return this.userService.update(parseInt(id), Body);
  }
}
