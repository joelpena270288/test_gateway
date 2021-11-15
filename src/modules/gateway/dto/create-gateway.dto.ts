import { Exclude, Expose, Type } from 'class-transformer';
import { IsNumber, IsString, IsNotEmpty, MaxLength} from 'class-validator';
import { CreatePeripheralDeviceDto } from '../../peripheral-device/dto/index';
@Exclude()
export class CreateGatewayDto {
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
    @MaxLength(10, {message: "The Gateway only supports 10 devices"})
   readonly peripherals_devices:CreatePeripheralDeviceDto[];
    

    
}