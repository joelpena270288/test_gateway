/*
https://docs.nestjs.com/controllers#controllers
*/
import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UseGuards, ParseUUIDPipe, Req, } from '@nestjs/common';
import { GatewayService } from './gateway.service';
import { ReadGatewayDto, CreateGatewayDto, UpdateGatewayDto, CreatePeripheralDeviceDto, UpdatePeripheralDeviceDto } from './dto/index';
@Controller('gateway')
export class GatewayController {
    constructor(private readonly _gatewayService: GatewayService) { }

    @Get()
   async getAll(): Promise<ReadGatewayDto[]> {
        return  this._gatewayService.getAll();
    }
    @Post()
 async create(@Body() gateway: CreateGatewayDto): Promise<ReadGatewayDto> {
    return  this._gatewayService.create(gateway);
  }
  @Delete(':id')
 async delete(@Param('id') id: string): Promise<ReadGatewayDto> {
    return  this._gatewayService.delete(id);
  }
  @Patch(':id')
 async update( @Param('id') id: string, @Body() periperal_device: CreatePeripheralDeviceDto): Promise<ReadGatewayDto> {
    return  this._gatewayService.addPeripheralDevice(id,periperal_device);
    
  }
  @Patch('delete_peripheral_device/:id')
 async deletePeripheralDevice( @Param('id') id: string, @Body() periperal_device: UpdatePeripheralDeviceDto): Promise<ReadGatewayDto> {
    return  this._gatewayService.deletePeripheralDevice(id,periperal_device);
    
  }
  @Get(':id')
 async getById(@Param('id') id: string): Promise<ReadGatewayDto> {
    return this._gatewayService.getById(id);
  }

}
