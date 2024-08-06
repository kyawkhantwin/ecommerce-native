import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  ValidationPipe,
} from '@nestjs/common';
import { CartsService } from './carts.service';
import { Prisma } from '@prisma/client';

@Controller('carts')
export class CartsController {
  constructor(private readonly cartsService: CartsService) {}

  @Post()
  async create(
    @Body(ValidationPipe)
    createCartDto: Prisma.ProductCartCreateManyCartInput & { userId: number },
  ) {
    const { userId, ...product } = createCartDto;
    return await this.cartsService.create(userId, product);
  }

  @Get()
  async findAll() {
    return await this.cartsService.findAll();
  }

  @Get('/user/:userId')
  async findUserCart(@Param('userId', ParseIntPipe) userId: number) {
    return await this.cartsService.findUserCart(userId);
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe)
    updateCartDto: Prisma.ProductCartUpdateManyMutationInput & {
      userId: number;
      productId: number;
    },
  ) {
    return await this.cartsService.update(id, updateCartDto);
  }

  @Delete(':cartId/products/:productId')
  async removeProductFromCart(
    @Param('cartId', ParseIntPipe) cartId: number,
    @Param('productId', ParseIntPipe) productId: number,
  ) {
    return await this.cartsService.remove(cartId, productId);
  }
}
