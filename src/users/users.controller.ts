import { AuthGuard } from './../guards/auth.guard';
import { User } from './user.entity';
import { AuthService } from './auth.service';
import { UserDTO } from './dtos/user.dto';
import { Serialize } from './../interceptors/serialize.interceptor';
import { UpdateUserDTO } from './dtos/update-user.dto';
import { UsersService } from './users.service';
import { CreateUserDTO } from './dtos/create-user.dto';
import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  Query,
  Session,
  UseGuards,
} from '@nestjs/common';
import { CurrentUser } from './decorators/current-user.decorator';

@Controller('auth')
@Serialize(UserDTO)
export class UsersController {
  constructor(
    private userService: UsersService,
    private authService: AuthService,
  ) {}

  // Test session cookie 

  // @Get('/colors/:color')
  // setColor(@Param('color') color: string, @Session() session: any){
  //   session.color = color;

  // }

  // @Get('/colors')
  // getColor(@Session() session: any){
  //   return session.color;
  // }

  // @Get('whoami')
  // whoAmI(@Session() session: any){
  //   return this.userService.findOne(session.userId);
  // }

  @Get('whoami')
  @UseGuards(AuthGuard)
  whoAmI(@CurrentUser() user: User){
    return user;
  }

  @Post('signout')
  signOut(@Session() session: any) {
    session.userId = null;
  }

  @Post('signin')
  async signin(@Body() body: CreateUserDTO, @Session() session: any) {
    const user = await this.authService.signin(body.email, body.password);
    session.userId = user.id;
    return user;
  }

  @Post('signup')
  async createUser(@Body() body: CreateUserDTO, @Session() session: any) {
    const user = await this.authService.signup(body.email, body.password);
    session.userId = user.id;
    return user;
  }

  // @UseInterceptors(new SerializeInterceptor(UserDTO))
  @Get('/:id')
  async findUser(@Param('id') id: string) {
    // console.log("handler is running")
    const user = await this.userService.findOne(parseInt(id));
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get()
  findAllUsersWithEmail(@Query('email') email: string) {
    return this.userService.find(email);
  }

  @Delete('/:id')
  deleteUser(@Param('id') id: string) {
    return this.userService.remove(parseInt(id));
  }

  @Patch('/:id')
  updateUser(@Param('id') id: string, @Body() body: UpdateUserDTO) {
    return this.userService.update(parseInt(id), body);
  }
}
