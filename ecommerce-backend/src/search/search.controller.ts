import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { SearchService } from './search.service';

@Controller('search')
export class SearchController {
  constructor(private readonly searchService: SearchService) {}
  @Get('/products/:name')
  searchProduct(@Param('name') name: string) {
    return this.searchService.searchProduct(name);
  }
  @Get('/category/:id')
  searchCategoryProducts(@Param('id', ParseIntPipe) id: number) {
    return this.searchService.searchCategoryProduct(id);
  }
}
