import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Ticket } from './entities/ticket.entity';

import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { MuseumService } from '../museums/museums.service';

@Injectable()
export class TicketsService {
  constructor(
    @InjectRepository(Ticket) private ticketRepository: Repository<Ticket>,
    private readonly museumService: MuseumService,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  async findTickets(): Promise<Ticket[]> {
    const tickets = await this.ticketRepository.find();
    return tickets;
  }

  async findTicketById(id: string): Promise<Ticket> {
    const ticket = await this.ticketRepository.findOneBy({ id });
    if (!ticket) {
      throw new NotFoundException(`No Ticket found with this ${id}.`);
    }
    return ticket;
  }

  async findTicketsByMuseumId(museumId: string): Promise<Ticket[]> {
    const loadedMuseum = await this.museumService.findMuseumById(museumId);

    const tickets = await this.ticketRepository.find({
      where: { museumId },
    });
    return tickets;
  }

  async createTicket(createTicketDto: CreateTicketDto): Promise<Ticket> {
    const newTicket = await this.ticketRepository.save(createTicketDto);
    return newTicket;
  }

  async updateTicket(
    id: string,
    updateTicketDto: UpdateTicketDto,
  ): Promise<Ticket> {
    // 1) find Ticket to update
    const ticketToUpdate = await this.findTicketById(id);

    // 2) update the Ticket
    const updatedTicket = { ...ticketToUpdate, ...updateTicketDto };

    return this.ticketRepository.save(updatedTicket);
  }

  async deleteTicket(id: string): Promise<void> {
    const { imageUrl } = await this.findTicketById(id);

    await this.cloudinaryService.deleteFileByImageUrl(imageUrl);

    await this.ticketRepository.delete({ id });
  }
}
