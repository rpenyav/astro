import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { HoroscopeModule } from './modules/horoscope/horoscope.module';
import { AstroChartModule } from './modules/astro-chart/astro-chart.module';
import { CompatibilityModule } from './modules/compatibility/compatibility.module';
import { ContentModule } from './modules/content/content.module';
import { TasksModule } from './tasks/tasks.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Hace que ConfigModule esté disponible en todo el proyecto
    }),
    MongooseModule.forRoot(process.env.DATABASE_URL),
    AuthModule,
    UserModule,
    HoroscopeModule,
    AstroChartModule,
    CompatibilityModule,
    ContentModule,
    TasksModule,
  ],
})
export class AppModule {}
