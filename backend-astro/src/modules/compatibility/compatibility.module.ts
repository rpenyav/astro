import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CompatibilityService } from './compatibility.service';
import { CompatibilityController } from './compatibility.controller';
import {
  Compatibility,
  CompatibilitySchema,
} from './schemas/compatibility.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Compatibility.name, schema: CompatibilitySchema },
    ]),
  ],
  providers: [CompatibilityService],
  controllers: [CompatibilityController],
})
export class CompatibilityModule {}
