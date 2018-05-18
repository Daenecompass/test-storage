import * as jwt from 'jsonwebtoken';
import { jwtSecret } from '../auth/passport/jwt.secret';

import { Get, Post, Put, Delete, Controller, Body, Param, Headers, HttpException, HttpStatus, UseGuards } from '@nestjs/common';

import { Roles } from '../common/decorators/roles.decorator';
import { RolesGuard } from './../common/guards/roles.guard';

import { ValidationPipe } from '../common/pipes/validation.pipe';
import { ParameterValidationPipe } from '../common/pipes/parameter-validation.pipe';
import { UserId } from '../common/decorators/user.decorator';

import { UsersService } from './users.service';

import { User } from './user.interface';
import { CreateUserDto } from './create-user.dto';

import {
  ApiUseTags,
  ApiBearerAuth,
  ApiResponse,
  ApiOperation,
} from '@nestjs/swagger';

@ApiBearerAuth()
@ApiUseTags('Users')
@Controller('api/v1/users')
@UseGuards(RolesGuard)
export class UsersController {

  constructor(private readonly usersService: UsersService) { }

  @Post()
  @ApiOperation({ title: 'Create User' })
  @ApiResponse({ status: 201, description: 'The user has been successfully created.' })
  @ApiResponse({ status: 400, description: 'Validation failed' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async create(
              @UserId(new ParameterValidationPipe) userId,
              @Body(new ValidationPipe()) createUserDto: CreateUserDto
            ): Promise<User> {
    return await this.usersService.create(createUserDto, userId);
  }

  @Get()
  @ApiOperation({ title: 'Get All Users' })
  @ApiResponse({ status: 200, description: 'The list of users has been successfully retrieved.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Get('me')
  @ApiOperation({ title: 'Get Current User' })
  @ApiResponse({ status: 200, description: 'The current user has been successfully retrieved.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async findMe(@UserId(new ParameterValidationPipe) userId): Promise<User> {
    return this.usersService.findMe(userId);
  }

  @Get(':id')
  @ApiOperation({ title: 'Get Single User by id' })
  @ApiResponse({ status: 200, description: 'The single user has been successfully retrieved.' })
  @ApiResponse({ status: 400, description: 'Validation failed' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async findOne(@Param('id', new ParameterValidationPipe()) id: string): Promise<User> {
    return this.usersService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ title: 'Update Single User by id' })
  @ApiResponse({ status: 200, description: 'The single user has been successfully updated.' })
  @ApiResponse({ status: 400, description: 'Validation failed' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async findOneAndUpdate(
    @UserId(new ParameterValidationPipe) userId,
    @Body(new ValidationPipe()) createUserDto: CreateUserDto,
    @Param('id', new ParameterValidationPipe()) id: string) {
    return await this.usersService.update(id, createUserDto, userId);
  }

  @Delete(':id')
  @Roles('administrator')
  @ApiOperation({ title: 'Delete Single User by id' })
  @ApiResponse({ status: 200, description: 'The single user has been successfully deleted.' })
  @ApiResponse({ status: 400, description: 'Validation failed' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async delete(@Param('id', new ParameterValidationPipe()) id: string) {
    return this.usersService.delete(id);
  }

}
