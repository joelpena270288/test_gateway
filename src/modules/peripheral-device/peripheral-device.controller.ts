/*
https://docs.nestjs.com/controllers#controllers
*/
import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UseGuards, ParseUUIDPipe, Req, } from '@nestjs/common';
import { CreatePeripheralDeviceDto, ReadPeripheralDeviceDto,UpdatePeripheralDeviceDto} from './dto/index';
import { PeripheralDeviceService } from './peripheral-device.service';
@Controller('peripheral-device')
export class PeripheralDeviceController {
    constructor(private readonly _peripheralDeviceService: PeripheralDeviceService) { }
    @Get(':id')
    get(@Param('id')id: string): Promise<ReadPeripheralDeviceDto> {
        return this._peripheralDeviceService.get(id);
    }
    @Post()
    create(@Body() peripheral_device: CreatePeripheralDeviceDto): Promise<ReadPeripheralDeviceDto> {
        return this._peripheralDeviceService.create(peripheral_device);
    }
    @Patch()
    update(@Body() peripheral_device: UpdatePeripheralDeviceDto): Promise<ReadPeripheralDeviceDto> {
        return this._peripheralDeviceService.update(peripheral_device);
    }
    @Delete(':id')
    delete(@Param('id')id: string): Promise<boolean> {
        return this._peripheralDeviceService.delete(id);
    }
}
