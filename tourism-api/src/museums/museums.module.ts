import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { Museum, MuseumSchema } from './schemas/museum.schema';
import { Category, CategorySchema } from './schemas/category.schema';
import { MuseumService } from './museums.service';
import { MuseumsController } from './museums.controller';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';
import { ArtifactsModule } from 'src/artifacts/artifacts.module';
import { CategoriesController } from './categories.controller';
import { CategoryService } from './categories.service';

@Module({
  imports: [
    CloudinaryModule,
    MongooseModule.forFeature([
      { name: Museum.name, schema: MuseumSchema },
      { name: Category.name, schema: CategorySchema },
    ]),
    forwardRef(() => ArtifactsModule),
  ],
  controllers: [MuseumsController, CategoriesController],
  providers: [MuseumService, CategoryService],
  exports: [MuseumService],
})
export class MuseumsModule {}
