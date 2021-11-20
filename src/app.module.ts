import { APP_FILTER } from '@nestjs/core';
import { AllExceptionsFilter } from './modules/exception.filter';
import { ConfingService } from './config/confing.service';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from './config/config.module';
import { Configuration } from './config/config.key';
import { DatabaseModule } from './database/database.module';
import { GatewayModule } from './modules/gateway/gateway.module';
@Module({
  imports: [ConfigModule, DatabaseModule, GatewayModule],
  controllers: [AppController],
  providers: [
   
    ConfingService,
    AppService,
  ],
})
export class AppModule {
  static port: number | string;
  constructor(private readonly _configService: ConfingService) {
    AppModule.port = this._configService.get(Configuration.PORT);
  }
}
