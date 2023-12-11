import {
  Inject,
  Injectable,
  NotFoundException,
  forwardRef,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Museum, MuseumDocument } from './schemas/museum.schema';
import { Model } from 'mongoose';
import { CreateMuseumDto } from './dtos/create-museum.dto';
import { UpdateMuseumDto } from './dtos/update-museum.dto';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { ArtifactService } from 'src/artifacts/artifacts.service';

@Injectable()
export class MuseumService {
  constructor(
    @InjectModel(Museum.name) private museumModel: Model<Museum>,
    @Inject(forwardRef(() => ArtifactService))
    private readonly artifactService: ArtifactService,

    // private readonly artifactService: ArtifactService,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  async findMuseums(): Promise<Museum[]> {
    const museums = await this.museumModel.find().populate('categoryId');
    // .populate('artifactsIds');
    return museums;
  }

  async findMuseumById(id: string): Promise<Museum> {
    const museum = await this.museumModel.findById(id).populate('categoryId');
    // .populate('artifactsIds');
    if (!museum) {
      throw new NotFoundException(`No museum found with this ${id}.`);
    }
    return museum;
  }

  async createMuseum(createMuseumDto: CreateMuseumDto): Promise<Museum> {
    const newMuseum = await this.museumModel.create(createMuseumDto);
    return newMuseum;
  }

  async updateMuseum(
    id: string,
    updateMuseumDto: UpdateMuseumDto,
  ): Promise<Museum> {
    const updatedMuseum = await this.museumModel.findByIdAndUpdate(
      id,
      updateMuseumDto,
      { new: true },
    );

    return updatedMuseum;
  }

  async deleteMuseum(id: string): Promise<void> {
    const { imageUrl, artifactsIds } = await this.findMuseumEntityById(id);

    // const { imageUrl, artifactsIds } = await this.findMuseumById(id);

    if (artifactsIds.length > 0) {
      artifactsIds.forEach(
        async (artifactId) =>
          await this.artifactService.deleteArtifact(artifactId.toString()),
      );
    }
    await this.cloudinaryService.deleteFileByImageUrl(imageUrl);

    await this.museumModel.findByIdAndDelete(id);
  }

  async findMuseumEntityById(id: string): Promise<MuseumDocument> {
    const museumDoc = await this.museumModel.findById(id);
    if (!museumDoc) {
      throw new NotFoundException(`No museum found with this ${id}.`);
    }
    return museumDoc;
  }
}
