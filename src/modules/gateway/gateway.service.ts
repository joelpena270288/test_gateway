/*
https://docs.nestjs.com/providers#services
@InjectRepository(CursoRepository)
*/

import { getMongoManager } from 'typeorm';
import { BadRequestException, Injectable, NotFoundException, } from '@nestjs/common';
import { GatewayRepository } from './gateway.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Gateway } from './gateway.entity';
import { GatewayDto } from './dto/index';
import { v4 } from 'is-ip';
import { PeripheralDeviceRepository } from '../peripheral-device/peripheral-device.repository';


@Injectable()
export class GatewayService {
    constructor(
        @InjectRepository(GatewayRepository)
        private readonly _gatewayRepository: GatewayRepository,

    ) { }
    async getAll(): Promise<Gateway[]> {
        
        const gateways: Gateway[] = await this._gatewayRepository.find();
      
        return gateways;
    }
    async create(gateway: GatewayDto): Promise<GatewayDto> {
        const validIP = v4(gateway.IPv4);
        if (!validIP) {
            throw new BadRequestException("IP is not valid");
        }
        const result = await this._gatewayRepository.save(gateway);
        if (!result) {
            throw new BadRequestException("Error in data");
        }
        if (gateway.peripherals_devices.length > 0) {
            for (let index = 0; index < gateway.peripherals_devices.length; index++) {
                const element = gateway.peripherals_devices[index];
                
            }
        }
        return gateway;
    }
}
