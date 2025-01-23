import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';
import { EnterpriseDto } from '../enterprises/dto/create-enterprise.dto';
import { UpdateEnterpriseDto } from '../enterprises/dto/update-enterprise.dto';
import { CreateEmployeeDto } from '../employees/dto/create-employee.dto';
import { UpdateEmployeeDto } from '../employees/dto/update-employee.dto';
@ApiTags('User')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    const { id } = req.user;
    return this.usersService.findById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post('profile')
  @HttpCode(HttpStatus.OK)
  handleProfile(
    @Request() req,
    @Body()
    data:
      | EnterpriseDto
      | UpdateEnterpriseDto
      | CreateEmployeeDto
      | UpdateEmployeeDto,
  ) {
    return this.usersService.handleProfile(req.user, data);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {}

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
