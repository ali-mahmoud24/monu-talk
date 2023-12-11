import {
  Inject,
  Injectable,
  NotFoundException,
  forwardRef,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Artifact, ArtifactDocument } from './schemas/artifact.schema';
import { Model } from 'mongoose';

import { CreateArtifactDto } from './dtos/create-artifact.dto';
import { UpdateArtifactDto } from './dtos/update-artifact.dto';
import { MuseumService } from '../museums/museums.service';
import { CloudinaryService } from '../cloudinary/cloudinary.service';

@Injectable()
export class ArtifactService {
  constructor(
    @InjectModel(Artifact.name) private artifactModel: Model<Artifact>,
    @Inject(forwardRef(() => MuseumService))
    private readonly museumService: MuseumService,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  async findArtifacts(): Promise<Artifact[]> {
    const artifacts = await this.artifactModel.find();
    return artifacts;
  }

  async findArtifactById(id: string): Promise<Artifact> {
    const artifact = await this.artifactModel.findById(id);
    if (!artifact) {
      throw new NotFoundException(`No artifact found with this ${id}.`);
    }
    return artifact;
  }

  async findArtifactsByMuseumId(museumId: string): Promise<Artifact[]> {
    const loadedMuseum =
      await this.museumService.findMuseumEntityById(museumId);

    if (!loadedMuseum) {
      throw new NotFoundException(`No Museum found with this ${museumId}.`);
    }

    const artifacts = await this.artifactModel.find({ museumId });
    return artifacts;
  }

  async createArtifact(
    createArtifactDto: CreateArtifactDto,
  ): Promise<Artifact> {
    const { museumId } = createArtifactDto;
    const loadedMuseum =
      await this.museumService.findMuseumEntityById(museumId);

    if (!loadedMuseum) {
      throw new NotFoundException(
        `No Museum found with this ${createArtifactDto.museumId}.`,
      );
    }

    const newArtifact = await this.artifactModel.create(createArtifactDto);

    loadedMuseum.artifactsIds.push(newArtifact.id);
    await loadedMuseum.save();

    return newArtifact;
  }

  async updateArtifact(
    id: string,
    updateArtifactDto: UpdateArtifactDto,
  ): Promise<Artifact> {
    const updatedArtifact = await this.artifactModel.findByIdAndUpdate(
      id,
      updateArtifactDto,
      { new: true },
    );

    return updatedArtifact;
  }

  async deleteArtifact(artifactId: string): Promise<void> {
    const { imageUrl, museumId } = await this.findArtifactById(artifactId);

    await this.cloudinaryService.deleteFileByImageUrl(imageUrl);

    await this.artifactModel.findByIdAndDelete(artifactId);

    const loadedMuseum =
      await this.museumService.findMuseumEntityById(museumId);

    loadedMuseum.artifactsIds = loadedMuseum.artifactsIds.filter(
      (id) => id.toString() !== artifactId,
    );

    await loadedMuseum.save();
  }

  async findArtifactEntityById(id: string): Promise<ArtifactDocument> {
    const artifactDoc = await this.artifactModel.findById(id);
    if (!artifactDoc) {
      throw new NotFoundException(`No artifact found with this ${id}.`);
    }
    return artifactDoc;
  }
}
