import { Exclude, Expose, Type } from 'class-transformer';
import { IsNumber, IsString, IsNotEmpty} from 'class-validator';
import { ReadPeripheralDeviceDto } from '../../peripheral-device/dto/index';
@Exclude()
export class ReadGatewayDto {
    @Expose()
    @IsNotEmpty()
    @IsString()
    readonly id: string;
    @Expose()
    @IsNotEmpty()
    @IsString()
    readonly serial_number: string;
    @Expose()
    @IsNotEmpty()
    @IsString()
    readonly name: string;
    @Expose()
    @IsNotEmpty()
    @IsString()
    readonly IPv4: string;
    @Expose()
   readonly peripherals_devices:ReadPeripheralDeviceDto[];
    

    
}