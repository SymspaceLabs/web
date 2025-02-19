import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import User from './entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MailchimpModule } from 'src/mailchimp/mailchimp.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]), MailchimpModule],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
