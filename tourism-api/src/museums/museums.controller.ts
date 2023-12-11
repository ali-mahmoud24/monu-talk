import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';

import { ParseMongoIdPipe } from '../mongo/pipes/parse-mongo-id.pipe';

import { Museum } from './schemas/museum.schema';

import { MuseumService } from './museums.service';

import { CreateMuseumDto } from './dtos/create-museum.dto';
import { UpdateMuseumDto } from './dtos/update-museum.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { json } from 'stream/consumers';

@Controller('museums')
export class MuseumsController {
  constructor(
    private readonly museumService: MuseumService,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  uploadImage(@UploadedFile() file: Express.Multer.File) {
    return this.cloudinaryService.uploadFile(file);
  }

  @Get()
  async findAll(): Promise<Museum[]> {
    return this.museumService.findMuseums();
  }

  @Get(':id')
  async findOne(@Param('id', ParseMongoIdPipe) id: string): Promise<Museum> {
    return this.museumService.findMuseumById(id);
  }

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  async create(
    @Body()
    createMuseumDto: CreateMuseumDto,
    @UploadedFile() image: Express.Multer.File,
  ): Promise<Museum> {
    // Upload Image to Cloudinary
    const { url } = await this.cloudinaryService.uploadFile(image);
    createMuseumDto.imageUrl = url;

    return this.museumService.createMuseum(createMuseumDto);
  }

  @Patch(':id')
  async update(
    @Param('id', ParseMongoIdPipe) id: string,
    @Body()
    updateMuseumDto: UpdateMuseumDto,
  ): Promise<Museum> {
    return this.museumService.updateMuseum(id, updateMuseumDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id', ParseMongoIdPipe) id: string): Promise<void> {
    await this.museumService.deleteMuseum(id);
  }
}
