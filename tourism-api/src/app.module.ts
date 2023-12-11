import {
  ClassSerializerInterceptor,
  Module,
  ValidationPipe,
} from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { MongoModule } from './mongo/mongo.module';
import { MuseumsModule } from './museums/museums.module';
import { ArtifactsModule } from './artifacts/artifacts.module';
import { CommonModule } from './common/common.module';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { AuthModule } from './auth/auth.module';
import { ModelModule } from './model/model.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongoModule,
    CommonModule,
    CloudinaryModule,
    AuthModule,
    MuseumsModule,
    ArtifactsModule,
    ModelModule,
  ],
  providers: [
    { provide: APP_PIPE, useClass: ValidationPipe },
  ],
})
export class AppModule {}
