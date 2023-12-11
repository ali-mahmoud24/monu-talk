import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { Artifact, ArtifactSchema } from './schemas/artifact.schema';

import { ArtifactService } from './artifacts.service';
import { ArtifactsController } from './artifacts.controller';
import { MuseumsModule } from 'src/museums/museums.module';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';

@Module({
  imports: [
    CloudinaryModule,
    MongooseModule.forFeature([
      { name: Artifact.name, schema: ArtifactSchema },
    ]),
    forwardRef(() => MuseumsModule),
  ],
  controllers: [ArtifactsController],
  providers: [ArtifactService],
  exports: [ArtifactService],
})
export class ArtifactsModule {}
