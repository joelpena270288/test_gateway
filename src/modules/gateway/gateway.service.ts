/*
https://docs.nestjs.com/providers#services
@InjectRepository(CursoRepository)
*/


import { BadRequestException, Injectable, NotFoundException, } from '@nestjs/common';
import { GatewayRepository } from './gateway.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Gateway } from './gateway.entity';
import { CreateGatewayDto, ReadGatewayDto, UpdateGatewayDto} from './dto/index';
import { v4 } from 'is-ip';
import { PeripheralDeviceRepository } from '../peripheral-device/peripheral-device.repository';
import { classToPlain, plainToClass } from 'class-transformer';
import { CreatePeripheralDeviceDto } from '../peripheral-device/dto/index';
import { PeripheralDevice } from '../peripheral-device/peripheral-device.entity';

@Injectable()
export class GatewayService {
    constructor(
        @InjectRepository(GatewayRepository)
        private readonly _gatewayRepository: GatewayRepository,

    ) { }
    async getAll(): Promise<ReadGatewayDto[]> {
        
        const gateways: Gateway[] = await this._gatewayRepository.find({ relations: ["peripheral_device"] });
       
        return plainToClass(ReadGatewayDto, gateways) ;
    }
    async create(gateway: CreateGatewayDto): Promise<CreateGatewayDto> {
        const validIP = v4(gateway.IPv4);
        let query_error = [];
        if (!validIP) {
            throw new BadRequestException("The IP number entered is not valid");
        }
        const savedgateway = await this._gatewayRepository.save(gateway);
        if (!savedgateway) {
            throw new BadRequestException("Failed to save the gateway check the data");
        }
        if (gateway.peripherals_devices.length > 0) {
            for (let index = 0; index < gateway.peripherals_devices.length; index++) {
                let peripheral_device = plainToClass(CreatePeripheralDeviceDto, gateway.peripherals_devices[index]) ;
                let new_peripheral_device: PeripheralDevice = new PeripheralDevice();
                new_peripheral_device.UID = peripheral_device.UID;
                new_peripheral_device.vendor = peripheral_device.vendor;
                new_peripheral_device.status = peripheral_device.status;
                new_peripheral_device.date_created = peripheral_device.date_created;
                new_peripheral_device.gateway = savedgateway;
               
                try {
                    new_peripheral_device.save();
                }
                catch (e) {
                    query_error.push("The device: " + index + " " + "UID: " + peripheral_device.UID + " " + "Vendor: " + peripheral_device.vendor + "It was not saved in the database check the data");
                }
               

            }
        }
        if (query_error.length > 0) {
            throw new BadRequestException(query_error);
         }
        return savedgateway;
    }
    async delete(Id: string): Promise<boolean> {
       
        try {
            const delete_gateway = await this._gatewayRepository.delete(Id);
        }
       
        catch (e) {
            throw new BadRequestException(e);
        }
        return true;
    }
    async update(gateway: UpdateGatewayDto): Promise<ReadGatewayDto> {
        let found_gateway = await this._gatewayRepository.findOne(gateway.id, { relations: ["peripheral_device"] });
        if (!found_gateway) {
            throw new BadRequestException("The gateway entered is not valid");
        }
        found_gateway.name = gateway.name;
        found_gateway.serial_number = gateway.serial_number;
        found_gateway.IPv4 = gateway.IPv4;
        
         
        const saved_gateway = await found_gateway.save();
        if (!saved_gateway) {
            throw new BadRequestException("Failed to save data")
        }

        saved_gateway.peripheral_device = found_gateway.peripheral_device;
        return plainToClass(ReadGatewayDto, saved_gateway);
        
    }
   async getById(id: string): Promise<ReadGatewayDto> {
    let found_gateway = await this._gatewayRepository.findOne(id, { relations: ["peripheral_device"] });
    if (!found_gateway) {
        throw new BadRequestException("The gateway entered is not valid");
       }
       return plainToClass(ReadGatewayDto, found_gateway);
    }
}
