import { UsersService } from './users.service';
import { CreateUserDTO } from './dtos/create-user.dto';
import { Body, Controller, Post } from '@nestjs/common';

@Controller('auth')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Post('signup')
  createUser(@Body() body: CreateUserDTO) {
    console.log(body);
  }
}
