import { Module } from '@nestjs/common';
import { CartsService } from './carts.service';
import { CartsController } from './carts.controller';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  controllers: [CartsController],
  providers: [CartsService],
  imports: [DatabaseModule],
})
export class CartsModule {}
