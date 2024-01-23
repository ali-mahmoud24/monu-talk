import { Module } from '@nestjs/common';
import { TicketsService } from './tickets.service';
import { TicketsController } from './tickets.controller';
import { CloudinaryModule } from '../cloudinary/cloudinary.module';
import { MuseumsModule } from '../museums/museums.module';

import { TypeOrmModule } from '@nestjs/typeorm';
import { Ticket } from './entities/ticket.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Ticket]),
    CloudinaryModule,
    MuseumsModule,
  ],
  controllers: [TicketsController],
  providers: [TicketsService],
})
export class TicketsModule {}
