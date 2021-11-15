/*
https://docs.nestjs.com/controllers#controllers
*/
import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UseGuards, ParseUUIDPipe, Req, } from '@nestjs/common';

import { Gateway } from './gateway.entity';
import { GatewayService } from './gateway.service';
import { ReadGatewayDto, CreateGatewayDto, UpdateGatewayDto } from './dto/index';
@Controller('gateway')
export class GatewayController {
    constructor(private readonly _gatewayService: GatewayService) { }

    @Get()
    getAll(): Promise<ReadGatewayDto[]> {
        return this._gatewayService.getAll();
    }
    @Post()
  create(@Body() gateway: CreateGatewayDto): Promise<CreateGatewayDto> {
    return this._gatewayService.create(gateway);
  }
  @Delete(':id')
  delete(@Param('id') id: string): Promise<boolean> {
    return this._gatewayService.delete(id);
  }
  @Patch()
  update(@Body() gateway: UpdateGatewayDto): Promise<ReadGatewayDto> {
    return this.update(gateway);
    
  }
  @Get(':id')
  getById(@Param('id') id: string): Promise<ReadGatewayDto> {
    return this._gatewayService.getById(id);
  }

}
