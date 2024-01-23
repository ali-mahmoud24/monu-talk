import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Review } from './entities/review.entity';

import { MuseumService } from '../museums/museums.service';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectRepository(Review) private reviewRepository: Repository<Review>,
    private readonly museumService: MuseumService,
  ) {}

  async findReviews(): Promise<Review[]> {
    const tickets = await this.reviewRepository.find();
    return tickets;
  }

  async findReviewById(id: string): Promise<Review> {
    const review = await this.reviewRepository.findOneBy({ id });
    if (!review) {
      throw new NotFoundException(`No Review found with this ${id}.`);
    }
    return review;
  }

  async findReviewsByMuseumId(museumId: string): Promise<Review[]> {
    const loadedMuseum = await this.museumService.findMuseumById(museumId);

    const reviews = await this.reviewRepository.find({
      where: { museumId },
    });
    return reviews;
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
