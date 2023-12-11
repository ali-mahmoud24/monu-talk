import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';

import { ParseMongoIdPipe } from '../mongo/pipes/parse-mongo-id.pipe';

import { Artifact } from './schemas/artifact.schema';

import { ArtifactService } from './artifacts.service';

import { CreateArtifactDto } from './dtos/create-artifact.dto';
import { UpdateArtifactDto } from './dtos/update-artifact.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

@Controller('artifacts')
export class ArtifactsController {
  constructor(
    private readonly artifactService: ArtifactService,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  @Get()
  async findAll(): Promise<Artifact[]> {
    return this.artifactService.findArtifacts();
  }

  @Get('museums/:museumId')
  async findByMuseumId(
    @Param('museumId', ParseMongoIdPipe) museumId: string,
  ): Promise<Artifact[]> {
    return this.artifactService.findArtifactsByMuseumId(museumId);
  }

  @Get(':id')
  async findOne(@Param('id', ParseMongoIdPipe) id: string): Promise<Artifact> {
    return this.artifactService.findArtifactById(id);
  }

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  async create(
    @Body()
    createArtifactDto: CreateArtifactDto,
    @UploadedFile() image: Express.Multer.File,
  ): Promise<Artifact> {
    // Upload Image to Cloudinary
    const { url } = await this.cloudinaryService.uploadFile(image);
    createArtifactDto.imageUrl = url;

    return this.artifactService.createArtifact(createArtifactDto);
  }

  @Patch(':id')
  async update(
    @Param('id', ParseMongoIdPipe) id: string,
    @Body()
    updateArtifactDto: UpdateArtifactDto,
  ): Promise<Artifact> {
    return this.artifactService.updateArtifact(id, updateArtifactDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id', ParseMongoIdPipe) id: string): Promise<void> {
    await this.artifactService.deleteArtifact(id);
  }
}
