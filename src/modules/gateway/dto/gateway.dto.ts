import { Type } from 'class-transformer';
import { IsNumber, IsString, IsNotEmpty} from 'class-validator';
import { PeripheralDeviceDto } from '../../peripheral-device/dto/index';
export class GatewayDto {
    @IsNotEmpty()
    @IsString()
    serial_number: string;
    @IsNotEmpty()
    @IsString()
    name: string;
    @IsNotEmpty()
    @IsString()
    IPv4: string;
    peripherals_devices:PeripheralDeviceDto[];
    

    
}