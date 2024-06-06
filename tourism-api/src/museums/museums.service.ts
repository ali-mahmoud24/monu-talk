import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMuseumDto } from './dtos/create-museum.dto';
import { UpdateMuseumDto } from './dtos/update-museum.dto';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Museum } from './entities/museum.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MuseumService {
  constructor(
    @InjectRepository(Museum) private museumRepository: Repository<Museum>,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  async findMuseums(): Promise<Museum[]> {
    const museums = await this.museumRepository.find({
      relations: { category: true },
    });

    return museums;
  }

  async findMuseumById(id: string): Promise<Museum> {
    const museum = await this.museumRepository.findOneBy({ id });
    if (!museum) {
      throw new NotFoundException(`No museum found with this ${id}.`);
    }
    return museum;
  }

  async createMuseum(createMuseumDto: CreateMuseumDto): Promise<Museum> {
    const newMuseum = await this.museumRepository.save(createMuseumDto);
    return newMuseum;
  }

  async updateMuseum(
    id: string,
    updateMuseumDto: UpdateMuseumDto,
    image: Express.Multer.File,
  ): Promise<Museum> {
    // 1) find Museum to update
    const museumToUpdate = await this.findMuseumById(id);

    // 2) Check if the User changed the image
    if (image) {
      // Upload Image to Cloudinary
      const { url } = await this.cloudinaryService.uploadFile(image);
      updateMuseumDto.imageUrl = url;

      await this.cloudinaryService.deleteFileByImageUrl(
        museumToUpdate.imageUrl,
      );
    }

    // 2) update the Museum
    const updatedMuseum = { ...museumToUpdate, ...updateMuseumDto };

    return this.museumRepository.save(updatedMuseum);
  }

  async deleteMuseum(id: string): Promise<void> {
    const { imageUrl } = await this.findMuseumById(id);

    await this.cloudinaryService.deleteFileByImageUrl(imageUrl);

    await this.museumRepository.delete({ id });
  }
}
