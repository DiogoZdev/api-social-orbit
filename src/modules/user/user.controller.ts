import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUser: CreateUserDto) {
    return this.userService.create(createUser);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(Number(id));
  }

  @Patch('/:id')
  update(@Param('id') id: string, @Body() user: UpdateUserDto) {
    return this.userService.update(user);
  }

  @Delete('/:id')
  remove(@Param('id') id: string) {
    return this.userService.remove(Number(id));
  }
}
