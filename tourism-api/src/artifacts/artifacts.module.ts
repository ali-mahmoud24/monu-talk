import { Module, forwardRef } from '@nestjs/common';

import { ArtifactService } from './artifacts.service';
import { ArtifactsController } from './artifacts.controller';
import { MuseumsModule } from 'src/museums/museums.module';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Artifact } from './entities/artifact.entity';

@Module({
  imports: [
    CloudinaryModule,
    TypeOrmModule.forFeature([Artifact]),
    MuseumsModule,
  ],
  controllers: [ArtifactsController],
  providers: [ArtifactService],
})
export class ArtifactsModule {}
