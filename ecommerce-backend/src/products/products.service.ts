import {
  Injectable,
  NotFoundException,
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class ProductsService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(createProductDto: Prisma.ProductCreateManyInput) {
    try {
      return await this.databaseService.product.create({
        data: createProductDto,
        include: { category: true },
      });
    } catch (error) {
      throw new ConflictException('Product could not be created', error);
    }
  }

  async findAll() {
    const product = await this.databaseService.product.findMany({
      include: { category: true },
    });

    if (!product.length) {
      throw new NotFoundException('Product Empty');
    }
    return product;
  }

  async findOne(id: number) {
    try {
      const product = await this.databaseService.product.findUnique({
        where: { id },
        include: { category: true },
      });

      if (!product) {
        throw new NotFoundException('Product not found');
      }

      return product;
    } catch (error) {
      throw new InternalServerErrorException('Could not retrieve the product');
    }
  }

  async update(
    id: number,
    updateProductDto: Prisma.ProductUpdateManyMutationInput,
  ) {
    try {
      const product = await this.databaseService.product.findUnique({
        where: { id },
      });

      if (!product) {
        throw new NotFoundException('Product not found');
      }

      return await this.databaseService.product.update({
        where: { id },
        data: updateProductDto,
      });
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new ConflictException('Product could not be updated');
    }
  }

  async remove(id: number) {
    try {
      const product = await this.databaseService.product.findUnique({
        where: { id },
        include: { category: true },
      });

      if (!product) {
        throw new NotFoundException('Product not found');
      }

      return await this.databaseService.product.delete({
        where: { id },
        include: { category: true },
      });
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Could not delete the product');
    }
  }
}
