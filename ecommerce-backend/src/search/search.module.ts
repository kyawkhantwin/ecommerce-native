import { Module } from '@nestjs/common';
import { SearchService } from './search.service';
import { SearchController } from './search.controller';
import { ProductsModule } from 'src/products/products.module';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  controllers: [SearchController],
  providers: [SearchService],
  imports: [ProductsModule,DatabaseModule],

})
export class SearchModule {}
