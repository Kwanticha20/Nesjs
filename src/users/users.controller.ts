import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { DeleteResult, UpdateResult } from 'typeorm';
import { Login } from './dto/login-user.dto';

@Controller('apis')
export class UsersController {
  //ใช้เพื่อบอกว่าตัวแปรนี้สามารถเข้าถึงได้เฉพาะภายใน class นี้เท่านั้น 
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  async create(@Body() createUserDto: CreateUserDto) {
     // การสร้างผู้ใช้ใหม่ด้วยข้อมูลจาก createUserDto
    return await this.usersService.create(createUserDto);
  }

  @Get('users')
  async findAll():Promise<CreateUserDto[]> {
     // ใช้ await เพื่อรอการดำเนินการของ usersService.findAll()
    return await this.usersService.findAll();// คืนค่าผลลัพธ์ที่ได้จากการดึงข้อมูลผู้ใช้ทั้งหมด
  }

  @Get('users/:id')
  
  async findOne(@Param('id') id: number) {
    return await this.usersService.findOne(id);
  }

  @Patch('users/:id')
  async update(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto):Promise<UpdateResult> {
    return await this.usersService.update(id, updateUserDto);
  }

  @Delete('users/:id')
  async dele0(@Param('id') id: number):Promise<DeleteResult> {
    return await this.usersService.remove(id);
  }
  
  @Post('login')
  async login(@Body() Login:Login): Promise<string> {
    return await this.usersService.login(Login);
  }
}
