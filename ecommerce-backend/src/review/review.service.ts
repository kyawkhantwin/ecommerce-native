import {
  Injectable,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class ReviewService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(createReviewDto: Prisma.UserProductReviewCreateManyInput) {
    const product = await this.databaseService.product.findUnique({
      where: { id: createReviewDto.productId },
    });

    const user = await this.databaseService.user.findUnique({
      where: { id: createReviewDto.userId },
    });

    const userAlreadyReviewed =
      await this.databaseService.userProductReview.findFirst({
        where: {
          userId: createReviewDto.userId,
          productId: createReviewDto.productId,
        },
      });

    console.log(userAlreadyReviewed);

    if (userAlreadyReviewed) {
      throw new NotAcceptableException('User Already Reviewed');
    }

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const review = await this.databaseService.userProductReview.create({
      data: createReviewDto,
      include: { user: true, product: true },
    });

    return review;
  }

  async findAllSingleProductReview(productId: number) {
    const product = await this.databaseService.product.findUnique({
      where: { id: productId },
    });

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    return this.databaseService.userProductReview.findMany({
      where: { productId },
      include: { user: true },
    });
  }

  async update(
    id: number,
    updateReviewDto: Prisma.UserProductReviewUncheckedUpdateInput,
  ) {
    const review = await this.databaseService.userProductReview.findUnique({
      where: { id },
    });

    if (!review) {
      throw new NotFoundException('Review Not Found');
    }

    return this.databaseService.userProductReview.update({
      data: updateReviewDto,
      where: { id },
    });
  }

  async remove(id: number) {
    const review = await this.databaseService.userProductReview.findUnique({
      where: { id },
    });

    if (!review) {
      throw new NotFoundException('Review Not Found');
    }

    return this.databaseService.userProductReview.delete({
      where: { id },
    });
  }
}
