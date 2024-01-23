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
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';

import { Museum } from './entities/museum.entity';
import { MuseumService } from './museums.service';

import { CreateMuseumDto } from './dtos/create-museum.dto';
import { UpdateMuseumDto } from './dtos/update-museum.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { CloudinaryService } from '../cloudinary/cloudinary.service';

@Controller('museums')
export class MuseumsController {
  constructor(
    private readonly museumService: MuseumService,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  @Get()
  async findAll(): Promise<Museum[]> {
    return this.museumService.findMuseums();
  }

  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string): Promise<Museum> {
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
  @UseInterceptors(FileInterceptor('image'))
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body()
    updateMuseumDto: UpdateMuseumDto,
    @UploadedFile() image: Express.Multer.File,
  ): Promise<Museum> {
    // if (image) {
    //   // Upload Image to Cloudinary
    //   const { url } = await this.cloudinaryService.uploadFile(image);
    //   updateMuseumDto.imageUrl = url;
    // }

    return this.museumService.updateMuseum(id, updateMuseumDto, image);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    await this.museumService.deleteMuseum(id);
  }
}
