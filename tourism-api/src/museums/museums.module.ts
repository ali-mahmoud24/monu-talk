import { Module, forwardRef } from '@nestjs/common';

import { MuseumService } from './museums.service';
import { MuseumsController } from './museums.controller';
import { CloudinaryModule } from '../cloudinary/cloudinary.module';
import { CategoriesController } from './categories.controller';
import { CategoryService } from './categories.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Museum } from './entities/museum.entity';
import { Category } from './entities/category.entity';

@Module({
  imports: [CloudinaryModule, TypeOrmModule.forFeature([Museum, Category])],
  controllers: [MuseumsController, CategoriesController],
  providers: [MuseumService, CategoryService],
  exports: [MuseumService],
})
export class MuseumsModule {}
