import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PeripheralDevice } from './peripheral-device.entity';
import { PeripheralDeviceRepository } from './peripheral-device.repository';

@Module({
    imports: [TypeOrmModule.forFeature([PeripheralDeviceRepository])]
})
export class PeripheralDeviceModule {}
