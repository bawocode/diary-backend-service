import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateDiaryDto } from './dto/create-diary.dto';
import { UpdateDiaryDto } from './dto/update-diary.dto';
import { Diary } from './entities/diary.entity';

@Injectable()
export class DiaryService {
  constructor(
    @InjectRepository(Diary)
    private diaryService: Repository<Diary>,
  ) {}
  async create(createDiaryDto: CreateDiaryDto): Promise<Diary> {
    const diary = this.diaryService.create(createDiaryDto);
    const date = new Date().toISOString();
    diary.dateCreated = date;
    diary.dateModified = date;

    return await this.diaryService.save(diary);
  }

  async findAllDiary(): Promise<Diary[]> {
    return await this.diaryService.find();
  }

  async findDiary(id: string): Promise<Diary> {
    const diary = await this.diaryService.findOne({
      where: { id },
    });
    if (!diary) {
      throw new HttpException(
        `Diary with id #${id} can not be found`,
        HttpStatus.NOT_FOUND,
      );
    }
    return diary;
  }

  async updateDiary(
    id: string,
    updateDiaryDto: UpdateDiaryDto,
  ): Promise<Diary> {
    const diary = await this.diaryService.findOne({
      where: { id },
    });
    if (!diary) {
      throw new NotFoundException('Diary not found');
    }
    diary.dateModified = new Date().toISOString();
    Object.assign(diary, updateDiaryDto);
    return this.diaryService.save(diary);
  }

  deleteDiary(id: string) {
    this.diaryService.delete(id);
  }
}
