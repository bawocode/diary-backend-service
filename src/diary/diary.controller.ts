import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { DiaryService } from './diary.service';
import { CreateDiaryDto } from './dto/create-diary.dto';
import { UpdateDiaryDto } from './dto/update-diary.dto';
import { Diary } from './entities/diary.entity';

@Controller('diary')
export class DiaryController {
  constructor(private readonly diaryService: DiaryService) {}

  @Post('create-diary')
  create(@Body() createDiaryDto: CreateDiaryDto) {
    return this.diaryService.create(createDiaryDto);
  }

  @Get('get-all-diaries')
  findAll() {
    return this.diaryService.findAllDiary();
  }

  @Get('get-diary/:id')
  findOne(@Param('id') id: string) {
    return this.diaryService.findDiary(id);
  }

  @Patch('update-diary/:id')
  update(@Param('id') id: string, @Body() updateDiaryDto: UpdateDiaryDto) {
    return this.diaryService.updateDiary(id, updateDiaryDto);
  }

  @Delete('delete-diary/:id')
  remove(@Param('id') id: string) {
    return this.diaryService.deleteDiary(id);
  }
}
