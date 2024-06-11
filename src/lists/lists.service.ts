import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateListDto } from './dto/create-list.dto';
import { UpdateListDto } from './dto/update-list.dto';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { List } from './entities/list.entity';
;

@Injectable()
export class ListsService {
  constructor(
    @InjectRepository(List)
    private readonly listsRepository:Repository<List>,
  ){}
  
  async create(createListDto: CreateListDto):Promise<CreateListDto> {
    return await this.listsRepository.save(createListDto);
  }

  async findAll(): Promise<CreateListDto[]> {
    return await this.listsRepository.find();
  }

  async findOne(id: number):Promise<List> {
   const list = await this.listsRepository.findOne({where:{id:id}});
   return list
  }

  async update(id: number, updateListDto: UpdateListDto):Promise<UpdateResult> {
    return await this.listsRepository.update(id,updateListDto);
  }

  async remove(id: number):Promise<DeleteResult> {
    return await this.listsRepository.delete(id);
  }
}
