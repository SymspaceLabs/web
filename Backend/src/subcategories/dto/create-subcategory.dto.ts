import { IsString, IsNotEmpty } from 'class-validator';

export class CreateSubcategoryDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  categoryId: string;
}
