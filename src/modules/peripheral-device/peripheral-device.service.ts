/*
https://docs.nestjs.com/providers#services
*/

import { BadRequestException, Injectable } from '@nestjs/common';
import { PeripheralDeviceRepository } from './peripheral-device.repository';
import { CreatePeripheralDeviceDto, ReadPeripheralDeviceDto, UpdatePeripheralDeviceDto} from './dto/index';
import { GatewayRepository } from '../gateway/gateway.repository';
import { PeripheralDevice } from './peripheral-device.entity';
import { plainToClass } from 'class-transformer';
import { Gateway } from '../gateway/gateway.entity';
@Injectable()
export class PeripheralDeviceService {
    constructor(
        private readonly _peripheralDeviceRepository: PeripheralDeviceRepository,
        private readonly _gatewayRepository: GatewayRepository
    ) { }
    async get(id: string): Promise<ReadPeripheralDeviceDto> {
        const found_peripheral_device = await this._peripheralDeviceRepository.findOne({ where: { id: id } });
        if (!found_peripheral_device) {
            throw new BadRequestException("The peripheral device entered is not valid");
        }
        return plainToClass(ReadPeripheralDeviceDto, found_peripheral_device);
    }

    async create(peripheral_device: CreatePeripheralDeviceDto): Promise<ReadPeripheralDeviceDto> {
        const foud_gateway = await this.validate(peripheral_device.Id_gateway);
        
        if (!foud_gateway) {
            throw new BadRequestException("There is no gateway entered");
        }
        if (foud_gateway.peripheral_device.length >= 10) {
            throw new BadRequestException("The gateway can only have 10 devices");
        }
        const new_peripheral_device = new PeripheralDevice();
        new_peripheral_device.UID = peripheral_device.UID;
        new_peripheral_device.date_created = peripheral_device.date_created;
        new_peripheral_device.vendor = peripheral_device.vendor;
        new_peripheral_device.status = peripheral_device.status;
        const saved_peripheral_device =   await new_peripheral_device.save();
        if (!saved_peripheral_device) {
            throw new BadRequestException("Failed to save peripheral device");
        }
        saved_peripheral_device.gateway = foud_gateway;
       return plainToClass(ReadPeripheralDeviceDto, saved_peripheral_device);
        
    }

    async update(peripheral_device: UpdatePeripheralDeviceDto): Promise<ReadPeripheralDeviceDto> {
        const foud_peripheral_device = await this._peripheralDeviceRepository
        .createQueryBuilder('peripheral_device')
        .innerJoin("peripheral_device.gateway", 'gateway')
            .where('gateway.id = :id_gateway', { id_gateway: peripheral_device.Id_gateway })
            .andWhere("peripheral_device.id = :id", {id: peripheral_device.id})
            .getOne();
        if (!foud_peripheral_device) {
            throw new BadRequestException("There is no peripheral device associated with the gateway entered")
        }
        foud_peripheral_device.UID = peripheral_device.UID;
        foud_peripheral_device.date_created = peripheral_device.date_created;
        foud_peripheral_device.vendor = peripheral_device.vendor;
        foud_peripheral_device.status = peripheral_device.status;

        const saved_peripheral_device = await foud_peripheral_device.save();
        if (!saved_peripheral_device) {
            throw new BadRequestException("Failed to save data");
        }
        return plainToClass(ReadPeripheralDeviceDto, saved_peripheral_device);

       
    }
    async delete(id: string): Promise<boolean> {
        const found_peripheral_device = await this._peripheralDeviceRepository.findOne({ where: { id: id } });
        if (!found_peripheral_device) {
            throw new BadRequestException("The peripheral device entered is not valid");
        }
        const delete_peripheral_device = await found_peripheral_device.remove();
        if (!delete_peripheral_device) {
            throw new BadRequestException("Failed to erase peripheral device");
        }
        return true;
    }
    async validate(id: string): Promise<Gateway> {
        const foud_gateway = await this._gatewayRepository
        .createQueryBuilder('gateway')
        .leftJoinAndSelect("gateway.peripheral_device", 'peripheral_device')
        .where('gateway.id = :id', { id: id })
        .getOne();
    
    if (!foud_gateway) {
        throw new BadRequestException("There is no gateway entered");
        }
        return foud_gateway;
    }

}
