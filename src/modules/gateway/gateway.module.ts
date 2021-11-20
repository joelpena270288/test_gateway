import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GatewayService } from './gateway.service';
import { GatewayRepository } from './gateway.repository'; 
import { GatewayController } from './gateway.controller';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            GatewayRepository
          ])

    ],
    exports: [TypeOrmModule],
    providers: [GatewayService],
    controllers: [GatewayController]
})
export class GatewayModule {}
