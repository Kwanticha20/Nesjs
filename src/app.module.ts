import { Module } from '@nestjs/common';
import { ListsModule } from './lists/lists.module';
import { ConfigModule } from '@nestjs/config';//ช่วยให้เราสามารถโหลดค่า configuration จาก env files
import { TypeOrmModule } from '@nestjs/typeorm';//เป็นโมดูลที่ใช้ในการเชื่อมต่อกับฐานข้อมูล
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    //forRoot เป็น เมธอดที่ใช้ในการโหลดและกำหนดค่าสำหรับโมดูลหลัก
    ConfigModule.forRoot({isGlobal:true}),//// ทำให้ ConfigModule ใช้ได้ทั่วทั้งแอปพลิเคชัน
    TypeOrmModule.forRoot({ //TypeOrmModule คือ เครื่องมือที่ช่วยให้การเชื่อมต่อและจัดการกับฐานข้อมูล
      type:'postgres',
      host:process.env.POSTGRES_HOST,
      port: parseInt(<string>process.env.POSTGRES_PORT),//parseInt() แปลงค่าจากสตริงเป็นเลขจำนวนเต็ม เพื่อให้สามารถนำไปใช้ในการเชื่อมต่อฐานข้อมูลได้ 
      username: process.env.POSTGRES_USER,//process ใช้ในการเข้าถึงตัวแปรที่กำหนดไว้ในไฟล์ .env
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DATABASE,
      autoLoadEntities: true, //โหลด entties อัตโนมัติโดยไม่ต้องกำหนด
      synchronize: true, //ตรวจสอบและอัปเดตโครงสร้างของตารางในฐานข้อมูลให้ตรงกับโครงสร้างของ entities ที่กำหนดไว้ในโค้ด
    }),
    ListsModule,
    UsersModule
  ],
  
})
export class AppModule {}
