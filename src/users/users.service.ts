import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Login } from './dto/login-user.dto';

@Injectable()//@Injectable() เป็น Decorator เพื่อระบุว่าคลาสที่ถูกประกาศเป็น Service สามารถถูก Inject หรือถูกใส่เข้าไปในคลาสอื่นได้ผ่าน Dependency Injection (DI) ของ NestJS
export class UsersService {
  //constructor ใช้กำหนดค่าเริ่มต้นให้กับอ็อบเจกต์
  constructor(
  @InjectRepository(User)// ใช้ @InjectRepository เพื่อเข้าถึง Repository ของ Entity User
    private readonly userRepository: Repository<User>,// Repository จะให้เมธอดต่าง ๆ ที่ช่วยในการCRUD
  ){}
  //async ช่วยให้ฟังก์ชันสามารถรอให้การดำเนินการเสร็จสิ้นก่อนที่จะดำเนินการต่อไปได้ โดยไม่บล็อกการทำงานของโปรแกรมในขณะเดียวกัน
  async create(createUserDto: CreateUserDto):Promise<CreateUserDto> {
    return await this.userRepository.save(createUserDto);
  }

  async findAll():Promise<CreateUserDto[]>{
    //await เพื่อรอให้การดึงข้อมูลเสร็จสิ้นก่อนที่จะส่งข้อมูลกลับต้องมีasync คู่ด้วย
    return await this.userRepository.find();
  }

  //= กำหนดค่าตัวแปร
  async findOne(id: number): Promise<User> {
    const user = await this.userRepository.findOne({where:{id:id}});//id ในฐานข้อมูลเท่ากับค่าของตัวแปร id
    return user // ส่งค่าผู้ใช้ที่พบกลับไป
  }

  async update(id: number, updateUserDto: UpdateUserDto) : Promise<UpdateResult>{ //คืนค่าเป็น Promise ที่มีชนิดข้อมูลเป็น UpdateResult
    return await this.userRepository.update(id,updateUserDto) ;
  }

  async remove(id: number):Promise<DeleteResult>{
    return await this.userRepository.delete(id);
  }

  async login (Login : Login):Promise<string>{
  // ดึงข้อมูลผู้ใช้จากฐานข้อมูลโดยใช้ username ที่ได้รับจาก Login
    const login = await this.userRepository.findOne({where:{username: Login.username}})
    
    // ตรวจสอบว่าผู้ใช้มีอยู่และรหัสผ่านตรงกัน
    //== เปรียบเทียบค่า โดยไม่คำนึงถึงชนิดข้อมูล มีการแปลงค่าอัตโนมัติ
    if (login && login.password.toString() == Login.password) {
    //&& เป็น logical operator ที่ใช้ตรวจสอบหลายเงื่อนไขพร้อมกัน 
      
      return 'Login successful';// ส่งข้อความเมื่อเข้าสู่ระบบสำเร็จ
    }
      
      return 'Invalid credentials'// ส่งข้อความเมื่อข้อมูลไม่ถูกต้อง
  }
}
 