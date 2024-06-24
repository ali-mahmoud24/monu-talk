import { Module, ValidationPipe } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD, APP_PIPE } from '@nestjs/core';
import { MuseumsModule } from './museums/museums.module';
import { ArtifactsModule } from './artifacts/artifacts.module';
import { CommonModule } from './common/common.module';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from './database/database.module';
import { TicketsModule } from './tickets/tickets.module';
import { ReviewsModule } from './reviews/reviews.module';

import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';

@Module({
  imports: [
    ConfigModule.forRoot(),
    DatabaseModule,
    // MongoModule,
    CommonModule,
    CloudinaryModule,
    AuthModule,
    MuseumsModule,
    ArtifactsModule,
    TicketsModule,
    ReviewsModule,

    ThrottlerModule.forRoot([
      {
        ttl: 60000, // 1 minute
        limit: 10000, // 1000 request
      },
    ]),
  ],
  providers: [
    { provide: APP_PIPE, useClass: ValidationPipe },
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
