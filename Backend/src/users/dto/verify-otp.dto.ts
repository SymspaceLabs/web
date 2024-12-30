// src/user/dto/verify-otp.dto.ts
import { IsNotEmpty, IsString } from 'class-validator';

export class VerifyOtpDto {
  @IsNotEmpty()
  @IsString()
  otp: string;
}