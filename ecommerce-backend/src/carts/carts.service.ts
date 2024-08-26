import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class CartsService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(
    userId: number,
    createCartDto: Prisma.ProductCartCreateManyCartInput,
  ) {
    let cart = await this.databaseService.cart.findUnique({
      where: { userId },
      include: { productCarts: true },
    });

    if (!cart) {
      cart = await this.databaseService.cart.create({
        data: {
          userId,
        },
        include: { productCarts: true },
      });
    } else {
      const existingProductInCart = cart.productCarts.find(
        (product) => product.productId === createCartDto.productId,
      );

      if (existingProductInCart) {
        throw new ConflictException('Product already exists in the cart');
      }
    }

    // Create related product carts
    await this.databaseService.productCart.create({
      data: {
        cartId: cart.id,
        productId: createCartDto.productId,
        price: createCartDto.price,
        quantity: createCartDto.quantity,
      },
    });

    return await this.databaseService.cart.findUnique({
      where: { id: cart.id },
      include: {
        productCarts: true,
      },
    });
  }

  async findAll() {
    const cart = await this.databaseService.cart.findMany({
      include: {
        productCarts: true,
      },
    });

    return cart;
  }
  async findUserCart(userId: number) {
    const cart = await this.databaseService.cart.findUnique({
      where: { userId },
      include: {
        productCarts: { include: { product: true } },
      },
    });

    if (!cart) {
      throw new NotFoundException('Cart Empty');
    }

    return cart;
  }

  // async findOne(id: number) {
  //   const cart = await this.databaseService.cart.findUnique({
  //     where: { id },
  //     include: {
  //       products: true,
  //     },
  //   });

  //   if (!cart) {
  //     throw new NotFoundException('Cart not found');
  //   }

  //   return cart;
  // }

  async update(
    id: number,
    updateCartDto: Prisma.ProductCartUpdateManyMutationInput & {
      userId: number;
      productId: number;
    },
  ) {
    const { userId, productId, ...updateData } = updateCartDto;

    // Check if the cart exists and belongs to the user
    const cart = await this.databaseService.cart.findFirst({
      where: { id, userId },
    });
    if (!cart) {
      throw new NotFoundException(
        'Cart Empty',
      );
    }

    // Check if the product exists in the cart
    const productCart = await this.databaseService.productCart.findFirst({
      where: {
        cartId: id,
        productId,
      },
    });

    if (!productCart) {
      throw new NotFoundException('Product not found in the cart');
    }

    // Update the product in the cart
    const updatedProductCart = await this.databaseService.productCart.update({
      where: {
        cartId_productId: {
          cartId: id,
          productId,
        },
      },
      data: { quantity: updateData.quantity, price: updateData.price },
      include: {
        product: true,
      },
    });

    return updatedProductCart;
  }
  async remove(cartId: number, productId: number) {
    // Check if the cart exists
    const cart = await this.databaseService.cart.findUnique({
      where: { id: cartId },
      include: {
        productCarts: { include: { product: true } },
      },
    });

    if (!cart) {
      throw new NotFoundException('Cart not found');
    }

    // Check if the product exists in the cart
    const productInCart = cart.productCarts.find(
      (productCart) => productCart.productId === productId,
    );
    if (!productInCart) {
      throw new NotFoundException('Product not found in the cart');
    }

    // Delete the product-cart relation
    await this.databaseService.productCart.delete({
      where: {
        cartId_productId: {
          cartId: cartId,
          productId: productId,
        },
      },
    });

    // Check if the cart has other products
    const remainingProducts = await this.databaseService.productCart.findMany({
      where: { cartId: cartId },
    });

    // If no other products exist, delete the cart
    if (remainingProducts.length === 0) {
      return await this.databaseService.cart.delete({
        where: { id: cartId },
      });
    }

    return { message: 'Product removed from cart' };
  }
}
