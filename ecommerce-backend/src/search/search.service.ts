import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { error } from 'console';
import { DatabaseService } from 'src/database/database.service';
import { ProductsService } from 'src/products/products.service';

@Injectable()
export class SearchService {
  constructor(private readonly dataBaseService: DatabaseService) {}

  async searchProduct(name: string) {
    const products = await this.dataBaseService.product.findMany();
    const lowerCaseName = name.toLowerCase();

    return products.filter((product) =>
      product.title.toLowerCase().includes(lowerCaseName),
    );
  }

  async searchCategoryProduct(categoryId: number) {
    const category = await this.dataBaseService.category.findUnique({
      where: { id: categoryId },
    });

    if (!category) {
      throw new NotFoundException('Category not found');
    }

    const products = await this.dataBaseService.product.findMany({
      where: { categoryId: category.id },
    });

    return products;
  }
}
