import { IsString } from 'class-validator';

export class CreateDiaryDto {
  @IsString()
  readonly title: string;
  @IsString()
  readonly content: string;
}
