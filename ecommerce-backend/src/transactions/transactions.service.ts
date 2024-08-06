import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class TransactionsService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(createTransactionDto: Prisma.TransactionCreateManyInput) {
    const { userId, orderId } = createTransactionDto;

    const order = await this.databaseService.order.findFirst({
      where: {
        id: orderId,
        userId: userId,
      },
      include: {
        productOrders: { include: { product: true } },
      },
    });

    if (!order) {
      return { error: 'Order not found' };
    }

    if (order.status === 'DONE') {
      return { message: 'Transaction already created' };
    }

    await this.databaseService.order.update({
      where: { id: order.id },
      data: { status: 'DONE' },
    });

    return await this.databaseService.transaction.create({
      data: createTransactionDto,
      include: {
        order: { include: { productOrders: { include: { product: true } } } },
        user: true,
      },
    });
  }

  async findAll() {
    const transactions = await this.databaseService.transaction.findMany({
      include: {
        order: { include: { productOrders: { include: { product: true } } } },
        user: true,
      },
    });
    if (!transactions.length) {
      throw new NotFoundException('Transaction Empty');
    }
    return transactions;
  }

  async findOne(id: number) {
    try {
      const transaction = await this.databaseService.transaction.findUnique({
        where: { id },
        include: {
          order: { include: { productOrders: { include: { product: true } } } },
          user: true,
        },
      });

      if (!transaction) {
        throw new NotFoundException('Transaction not found');
      }

      return transaction;
    } catch (error) {
      throw new InternalServerErrorException(
        'Could not retrieve the transaction',
      );
    }
  }

  async remove(id: number) {
    try {
      const transaction = await this.databaseService.transaction.findUnique({
        where: { id },
        include: {
          order: { include: { productOrders: { include: { product: true } } } },
          user: true,
        },
      });

      if (!transaction) {
        throw new NotFoundException('Transaction not found');
      }

      return await this.databaseService.transaction.delete({
        where: { id },
        include: {
          order: { include: { productOrders: { include: { product: true } } } },
          user: true,
        },
      });
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException(
        'Could not delete the transaction',
      );
    }
  }
}
