import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Review } from './entities/review.entity';

import { MuseumService } from '../museums/museums.service';
import { AuthService } from 'src/auth/auth.service';
import { plainToInstance } from 'class-transformer';
import { User } from 'src/auth/user.entity';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectRepository(Review) private reviewRepository: Repository<Review>,
    private readonly museumService: MuseumService,
    private readonly authService: AuthService,
  ) {}

  async findReviews() {
    const reviews = await this.reviewRepository.find({
      relations: { museum: true },
    });

    const mappedReviews = await Promise.all(
      reviews.map(async (review) => {
        const userName = await this.authService.getUserFullName(review.userId);

        const mappedReview: any = {
          userName,
          museumName: review.museum.name,
          ...review,
        };

        delete mappedReview.museumId;
        delete mappedReview.userId;
        delete mappedReview.museum;

        return mappedReview;
      }),
    );

    return mappedReviews;
  }

  async findReviewById(id: string): Promise<Review> {
    const review = await this.reviewRepository.findOneBy({ id });
    if (!review) {
      throw new NotFoundException(`No Review found with this ${id}.`);
    }
    return review;
  }

  async findReviewsByMuseumId(museumId: string): Promise<Review[]> {
    const reviews = await this.reviewRepository.find({
      where: { museumId },
      order: { createdAt: 'ASC' },
      relations: { museum: true },
    });

    const mappedReviews = await Promise.all(
      reviews.map(async (review) => {
        const userName = await this.authService.getUserFullName(review.userId);

        const mappedReview: any = {
          userName,
          museumName: review.museum.name,
          ...review,
        };

        delete mappedReview.museumId;
        delete mappedReview.userId;
        delete mappedReview.museum;

        return mappedReview;
      }),
    );

    return mappedReviews;
  }

  async createReview(createReviewDto: CreateReviewDto): Promise<Review> {
    const newTicket = await this.reviewRepository.save(createReviewDto);
    return newTicket;
  }

  async updateReview(
    id: string,
    updateReviewDto: UpdateReviewDto,
  ): Promise<Review> {
    // 1) find Review to update
    const reviewToUpdate = await this.findReviewById(id);

    // 2) update the Review
    const updatedReview = { ...reviewToUpdate, ...updateReviewDto };

    return this.reviewRepository.save(updatedReview);
  }

  async deleteReview(id: string): Promise<void> {
    await this.reviewRepository.delete({ id });
  }
}
