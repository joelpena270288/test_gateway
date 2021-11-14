import { Repository, EntityRepository } from 'typeorm';
import { PeripheralDevice } from './peripheral-device.entity';

@EntityRepository(PeripheralDevice)
export class PeripheralDeviceRepository extends Repository<PeripheralDevice>{ }