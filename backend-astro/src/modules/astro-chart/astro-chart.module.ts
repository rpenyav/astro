import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AstroChartService } from './astro-chart.service';
import { AstroChartController } from './astro-chart.controller';
import { AstroChart, AstroChartSchema } from './schemas/astro-chart.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: AstroChart.name, schema: AstroChartSchema },
    ]),
  ],
  providers: [AstroChartService],
  controllers: [AstroChartController],
})
export class AstroChartModule {}
