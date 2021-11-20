import { Exclude, Expose, Type } from 'class-transformer';
import { IsString, IsNotEmpty, MaxLength, ValidateNested} from 'class-validator';
import { CreatePeripheralDeviceDto } from './index';
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
    @ValidateNested({ each: true })
    @Type((type) => CreatePeripheralDeviceDto)
    readonly peripherals_devices: CreatePeripheralDeviceDto[];
    

    
}