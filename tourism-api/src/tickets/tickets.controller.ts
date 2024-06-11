import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
  HttpCode,
  ParseUUIDPipe,
  UseInterceptors,
  UploadedFile,
  Query,
  BadRequestException,
} from '@nestjs/common';
import { TicketsService } from './tickets.service';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { Ticket } from './entities/ticket.entity';
import { FileInterceptor } from '@nestjs/platform-express';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

@Controller('tickets')
export class TicketsController {
  constructor(
    private readonly ticketsService: TicketsService,
    private cloudinaryService: CloudinaryService,
  ) {}

  @Post()
  // @UseInterceptors(FileInterceptor('image'))
  async create(
    @Body() createTicketDto: CreateTicketDto,
    // @UploadedFile() image: Express.Multer.File,
  ): Promise<Ticket> {
    // Upload Image to Cloudinary
    // const { url } = await this.cloudinaryService.uploadFile(image);
    // createTicketDto.imageUrl = url;

    return this.ticketsService.createTicket(createTicketDto);
  }

  @Get()
  async findAll(): Promise<Ticket[]> {
    return this.ticketsService.findTickets();
  }

  @Get('museums/:museumId')
  async findByMuseumId(
    @Param('museumId', ParseUUIDPipe) museumId: string,
  ): Promise<Ticket[]> {
    return this.ticketsService.findTicketsByMuseumId(museumId);
  }

  @Get('users/:userId')
  async findByUserId(
    @Param('userId', ParseUUIDPipe) userId: string,
    @Query('date') date: string,
  ): Promise<Ticket[]> {
    if (date !== 'prev' && date !== 'upcoming') {
      throw new BadRequestException(
        'Invalid query parameter. Use "prev" or "upcoming".',
      );
    }

    return this.ticketsService.findTicketsByUserId(userId, date);
  }

  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string): Promise<Ticket> {
    return this.ticketsService.findTicketById(id);
  }

  @Patch(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateTicketDto: UpdateTicketDto,
  ): Promise<Ticket> {
    return this.ticketsService.updateTicket(id, updateTicketDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    return this.ticketsService.deleteTicket(id);
  }
}
