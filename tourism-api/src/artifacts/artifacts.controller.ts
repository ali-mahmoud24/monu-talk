import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';

import { Artifact } from './entities/artifact.entity';

import { ArtifactService } from './artifacts.service';

import { CreateArtifactDto } from './dtos/create-artifact.dto';
import { UpdateArtifactDto } from './dtos/update-artifact.dto';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';

import { CloudinaryService } from '../cloudinary/cloudinary.service';

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
    @Param('museumId', ParseUUIDPipe) museumId: string,
  ): Promise<Artifact[]> {
    return this.artifactService.findArtifactsByMuseumId(museumId);
  }

  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string): Promise<Artifact> {
    return this.artifactService.findArtifactById(id);
  }

  @Post()
  @UseInterceptors(FilesInterceptor('images'))
  async create(
    @Body()
    createArtifactDto: CreateArtifactDto,
    @UploadedFiles() images: Express.Multer.File[],
  ): Promise<Artifact> {
    return this.artifactService.createArtifact(createArtifactDto, images);
  }
  // @Post()
  // @UseInterceptors(FileInterceptor('image'))
  // async create(
  //   @Body()
  //   createArtifactDto: CreateArtifactDto,
  //   @UploadedFile() image: Express.Multer.File,
  // ): Promise<Artifact> {
  //   // Upload Image to Cloudinary
  //   const { url } = await this.cloudinaryService.uploadFile(image);
  //   createArtifactDto.imageUrl = url;

  //   return this.artifactService.createArtifact(createArtifactDto);
  // }

  @Patch(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body()
    updateArtifactDto: UpdateArtifactDto,
  ): Promise<Artifact> {
    return this.artifactService.updateArtifact(id, updateArtifactDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    await this.artifactService.deleteArtifact(id);
  }
}
