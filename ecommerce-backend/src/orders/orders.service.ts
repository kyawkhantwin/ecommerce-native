import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class OrdersService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(createOrderDto: { cartId: number; userId: number }) {
    // Find the cart and include its products
    const cart = await this.databaseService.cart.findFirst({
      where: { id: createOrderDto.cartId, userId: createOrderDto.userId },
      include: { productCarts: true },
    });
    // Check if the cart exists and belongs to the user
    if (!cart) {
      throw new NotFoundException(
        'Cart not found or does not belong to the user',
      );
    }

    // Create a new order for the user
    const order = await this.databaseService.order.create({
      data: {
        user: { connect: { id: cart.userId } },
      },
    });

    // Create product orders based on the cart's products
    await this.databaseService.productOrder.createMany({
      data: cart.productCarts.map((product) => ({
        orderId: order.id,
        productId: product.productId,
        quantity: product.quantity,
        price: product.price,
      })),
    });

    //Delete cart  and productCart after creating order
    await this.databaseService.productCart.deleteMany({
      where: { cartId: cart.id },
    });

    await this.databaseService.cart.delete({
      where: { id: cart.id, userId: cart.userId },
    });

    // Return the newly created order with its products and user details
    return await this.databaseService.order.findUnique({
      where: { id: order.id },
      include: {
        productOrders: {
          include: {
            product: true,
          },
        },
        user: true,
      },
    });
  }

  async findAll(status: string, latest?: number) {
    let whereClause: any;
    if (status === 'pending') {
      whereClause = { status: 'PENDING' };
    } else if (status === 'done') {
      whereClause = { status: 'DONE' };
    } else {
      //if there is no status return all
      const orders = await this.databaseService.order.findMany({});

      if (!orders || orders.length === 0) {
        throw new NotFoundException('No orders found');
      }

      return orders;
    }

    const query: any = {
      where: whereClause,
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        productOrders: {
          include: {
            product: true,
          },
        },
        user: true,
      },
    };

    const orders = await this.databaseService.order.findMany(query);

    if (!orders || orders.length === 0) {
      throw new NotFoundException('No orders found');
    }

    return orders;
  }

  async findAllUserOrder(userId: number, status: string, latest?: number) {
    let whereClause : {}
    if (status === 'pending') {
      whereClause = { status: 'PENDING', userId };
    } else if (status === 'done') {
      whereClause = { status: 'DONE', userId };
    } else {
      whereClause = {userId}
    }

    const query: Prisma.OrderFindManyArgs = {
      where: whereClause,
      include: {
        productOrders: {
          include: {
            product: true,
          },
        },
        user: true,
      },
    };

    if (latest && latest > 0) {
      query.take = latest;
    }

    const orders = await this.databaseService.order.findMany(query);

    if (!orders || orders.length === 0) {
      throw new NotFoundException('No orders found');
    }

    return orders;
  }

  async findOne(id: number) {
    const order = await this.databaseService.order.findUnique({
      where: { id },
      include: {
        productOrders: {
          include: {
            product: true,
          },
        },
        user: true,
      },
    });
    return order;
  }

  // TODO: Add an update method if order status feature is added
  // async update(id: number, updateOrderDto: Prisma.ProductOrderCreateManyInput) {
  //   return await this.databaseService.productOrder.update({
  //     where: { orderId_productId: { orderId, productId } },
  //     data: updateOrderDto,
  //   });
  // }

  async remove(id: number) {
    return await this.databaseService.order.delete({
      where: { id },
      include: {
        productOrders: { include: { product: true } },
        user: true,
      },
    });
  }
}
