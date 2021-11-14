/*
https://docs.nestjs.com/controllers#controllers
*/
import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UseGuards, ParseUUIDPipe, Req, } from '@nestjs/common';

import { Gateway } from './gateway.entity';
import { GatewayService } from './gateway.service';
import { GatewayDto } from './dto/index';
@Controller('gateway')
export class GatewayController {
    constructor(private readonly _gatewayService: GatewayService) { }

    @Get()
    getAll(): Promise<Gateway[]> {
        return this._gatewayService.getAll();
    }
    @Post()
  createCurso(@Body() gateway: GatewayDto): Promise<GatewayDto> {
    return this._gatewayService.create(gateway);
  }
}
