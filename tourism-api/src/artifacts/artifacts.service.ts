import {
  Inject,
  Injectable,
  NotFoundException,
  forwardRef,
} from '@nestjs/common';

import { Artifact } from './entities/artifact.entity';

import { CreateArtifactDto } from './dtos/create-artifact.dto';
import { UpdateArtifactDto } from './dtos/update-artifact.dto';
import { MuseumService } from '../museums/museums.service';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { image } from '@tensorflow/tfjs';

@Injectable()
export class ArtifactService {
  constructor(
    @InjectRepository(Artifact)
    private readonly artifactRepository: Repository<Artifact>,
    private readonly museumService: MuseumService,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  async findArtifacts(): Promise<Artifact[]> {
    const artifacts = await this.artifactRepository.find();
    return artifacts;
  }

  async findArtifactById(id: string): Promise<Artifact> {
    const artifact = await this.artifactRepository.findOneBy({ id });
    if (!artifact) {
      throw new NotFoundException(`No artifact found with this ${id}.`);
    }
    return artifact;
  }

  async findArtifactsByMuseumId(museumId: string): Promise<Artifact[]> {
    const loadedMuseum = await this.museumService.findMuseumById(museumId);

    const artifacts = await this.artifactRepository.find({
      where: { museumId },
    });
    return artifacts;
  }

  async createArtifact(
    createArtifactDto: CreateArtifactDto,
    images: Express.Multer.File[],
  ): Promise<Artifact> {
    const { museumId } = createArtifactDto;
    const loadedMuseum = await this.museumService.findMuseumById(museumId);

    console.log('images');
    console.log(images);

    // Upload Images to Cloudinary
    const uploadMultiResponse =
      await this.cloudinaryService.uploadManyFiles(images);

    console.log('res');
    console.log(uploadMultiResponse);

    const urls = uploadMultiResponse.map((res) => res.url);

    console.log('urls');
    console.log(urls);

    const newArtifact = this.artifactRepository.create({
      ...createArtifactDto,
      imageUrlList: urls,
    });

    console.log(newArtifact);

    await this.artifactRepository.save(newArtifact);

    return newArtifact;
  }

  async updateArtifact(
    id: string,
    updateArtifactDto: UpdateArtifactDto,
  ): Promise<Artifact> {
    // 1) find Artifact to update
    const artifactToUpdate = await this.findArtifactById(id);

    // 2) update the Artifact
    const updatedArtifact = { ...artifactToUpdate, ...updateArtifactDto };

    return this.artifactRepository.save(updatedArtifact);
  }

  async deleteArtifact(id: string): Promise<void> {
    const { imageUrlList } = await this.findArtifactById(id);

    await this.cloudinaryService.deleteManyFilesByImageUrl(imageUrlList);

    await this.artifactRepository.delete({ id });
  }
}
