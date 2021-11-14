import { ConfingService } from './config/confing.service';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from './config/config.module';
import { Configuration } from './config/config.key';
import { DatabaseModule } from './database/database.module';
import { GatewayModule } from './modules/gateway/gateway.module';
import { PeripheralDeviceModule } from './modules/peripheral-device/peripheral-device.module';

@Module({
  imports: [ConfigModule, DatabaseModule, GatewayModule, PeripheralDeviceModule],
  controllers: [AppController],
  providers: [ConfingService, AppService],
})
export class AppModule {
  static port: number | string;
  constructor(private readonly _configService: ConfingService) {
    AppModule.port = this._configService.get(Configuration.PORT);
  }
}
