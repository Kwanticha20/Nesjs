import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ListsService } from './lists.service';
import { CreateListDto } from './dto/create-list.dto';
import { UpdateListDto } from './dto/update-list.dto';
import { List } from './entities/list.entity';

@Controller('apis')
export class ListsController {
  constructor(private readonly listsService: ListsService) {}

  @Post('list')
  async create(@Body() createListDto: CreateListDto) {
    return await this.listsService.create(createListDto);
  }

  @Get('list')
  async findAll():Promise<CreateListDto[]> {
    return await this.listsService.findAll();
  }

  @Get('list/:id')
  async findOne(@Param('id') id: number) {
    return await this.listsService.findOne(id);
  }

  @Patch('list/:id')
  async update(@Param('id') id: number, @Body() updateListDto: UpdateListDto) {
    return await this.listsService.update(id, updateListDto);
  }

  @Delete('list/:id')
  async remove(@Param('id') id:number) {
    return await  this.listsService.remove(id);
  }
}
