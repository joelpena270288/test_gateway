/*
https://docs.nestjs.com/providers#services
@InjectRepository(CursoRepository)
*/


import { BadRequestException, Injectable } from '@nestjs/common';
import { Gateway } from './gateway.entity';
import { CreateGatewayDto, CreatePeripheralDeviceDto, ReadGatewayDto, UpdatePeripheralDeviceDto} from './dto/index';
import { v4 } from 'is-ip';
import { plainToClass } from 'class-transformer';
import { PeripheralDevice } from './peripheral-device.entity';
import {getMongoRepository } from "typeorm"
@Injectable()
export class GatewayService {
    constructor() { }
    //Method to get all Gateway
    async getAll(): Promise<ReadGatewayDto[]> {
        const gatewayRepository = getMongoRepository(Gateway);
        const gateways: Gateway[] = await gatewayRepository.find();         
        return plainToClass(ReadGatewayDto, gateways);
    }
    //Method to add a Gateway
    async create(gateway: CreateGatewayDto): Promise<ReadGatewayDto> {
        const gatewayRepository = getMongoRepository(Gateway);
        //Validate that only up to 10 peripheral devices are found
        if (gateway.peripherals_devices.length >= 10) {
            throw new BadRequestException("Gateways only support 10 peripheral devices");
        }
        //Validate that the IP number entered is correct
        const validIP = v4(gateway.IPv4);
      
        if (!validIP) {
            throw new BadRequestException("The IP number entered is not valid");
        }
        //Validate that there is only one IP for each Gateway
        const found_gateway = await gatewayRepository.findOne({ where: {IPv4: gateway.IPv4}});
        if (found_gateway) {
            throw new BadRequestException("This IPv4 exist in data base");
        }
        //Create a Gateway
        const newgateway: Gateway = new Gateway();
        newgateway.IPv4 = gateway.IPv4;
        newgateway.name = gateway.name;
        newgateway.serial_number = gateway.serial_number;
        newgateway.peripherals_devices = [];
      //Check if any peripheral device has been introduced and add it to the Gateway
        if (gateway.peripherals_devices.length > 0) {
            for (let index = 0; index < gateway.peripherals_devices.length; index++) {
                let new_peripheral_device: PeripheralDevice = new PeripheralDevice(
                    gateway.peripherals_devices[index].UID,
                    gateway.peripherals_devices[index].vendor,
                    gateway.peripherals_devices[index].status,
                    gateway.peripherals_devices[index].date_created
                );
                newgateway.peripherals_devices.push(new_peripheral_device);               
            }   
           
        }
            const savedgateway = await gatewayRepository.save(newgateway);
        if (!savedgateway) {
            throw new BadRequestException("Failed to save the gateway check the data");
        }
        return plainToClass(ReadGatewayDto, savedgateway) ;
    }
    //Method to remove a Gateway
    async delete(Id: string): Promise<ReadGatewayDto> {
        const gatewayRepository = getMongoRepository(Gateway);        
        const delete_gateway = await gatewayRepository.delete(Id);
        if (!delete_gateway) {
            throw new BadRequestException("The Gateway dont saved");
         }
       
        return plainToClass(ReadGatewayDto, delete_gateway);
    }
    //Add an edge device to the selected Gateway
    async addPeripheralDevice(id: string, peripheral_device: CreatePeripheralDeviceDto): Promise<ReadGatewayDto> {
        const gatewayRepository = getMongoRepository(Gateway);
       //Verify that the Gateway entered is valid
        let found_gateway = await gatewayRepository.findOne(id);
        if (!found_gateway) {
            throw new BadRequestException("The gateway entered is not valid");
        }
        if (found_gateway.peripherals_devices.length >= 10) {
            throw new BadRequestException("Gateways only support 10 peripheral devices");
        }
        //Create an edge device and add it to the Gateway
        const new_peripheral_device: PeripheralDevice = new PeripheralDevice(peripheral_device.UID,peripheral_device.vendor,peripheral_device.status, peripheral_device.date_created);
        found_gateway.peripherals_devices.push(new_peripheral_device);        
        const saved_gateway = await found_gateway.save();
        if (!saved_gateway) {
            throw new BadRequestException("Failed to save data")
        }       
        return plainToClass(ReadGatewayDto, saved_gateway);
        
    }
    //Get a Gateway by id
    async getById(id: string): Promise<ReadGatewayDto> {
        const gatewayRepository = getMongoRepository(Gateway);
        //Verify that the Gateway entered is valid
       let found_gateway = await gatewayRepository.findOne(id);
    if (!found_gateway) {
        throw new BadRequestException("The gateway entered is not valid");
       }
       return plainToClass(ReadGatewayDto, found_gateway);
    }
    //Method to remove a peripheral device from a selected Gateway
    async deletePeripheralDevice(idgateway: string, periperal_device: UpdatePeripheralDeviceDto): Promise<ReadGatewayDto> {
        const mongoRepository = getMongoRepository(Gateway);
       //Verify that the Gateway entered is valid
        const gateway = await this.getById(idgateway);
        if (!gateway) {
            throw new BadRequestException("Error in input data");
        }
        //Remove the peripheral device from the Gateway
       const update_cateway = await mongoRepository.findOneAndUpdate({_id: gateway.id }, { $pull: { peripherals_devices: { UID: periperal_device.UID } } });
        if (!update_cateway) {
            throw new BadRequestException("Failed to erase peripheral device ");
        }      
        return  plainToClass(ReadGatewayDto,update_cateway)
       
        
    }
}

