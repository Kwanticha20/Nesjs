import { Module } from '@nestjs/common';
import { ListsService } from './lists.service';
import { ListsController } from './lists.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { List } from './entities/list.entity';

@Module({
   //TypeOrmModule เชื่อมต่อกับฐานข้อมูล
   //forFeature() เป็นเมธอดที่ใช้ในการกำหนด entities 
  imports:[TypeOrmModule.forFeature([List])],
  controllers: [ListsController],
  providers: [ListsService],
})
export class ListsModule {}
