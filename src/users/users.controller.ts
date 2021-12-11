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
} from '@nestjs/common';

@Controller('auth')
@Serialize(UserDTO)
export class UsersController {
  constructor(
    private userService: UsersService,
    private authService: AuthService,
  ) {}

  @Post('signin')
  signin(@Body() body: CreateUserDTO) {
    return this.authService.signin(body.email, body.password);
  }

  @Post('signup')
  createUser(@Body() body: CreateUserDTO) {
    return this.authService.signup(body.email, body.password);
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
  findAllUsers(@Query('email') email: string) {
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
