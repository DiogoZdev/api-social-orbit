import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaModule } from '../database/prisma.module';
import { UtilsModule } from '../utils/utils.module';

@Module({
  imports: [
    PrismaModule,
    UtilsModule,
  ],
  controllers: [UserController],
  providers: [UserService]
})
export class UserModule {}
