import { Exclude, Expose, Type } from 'class-transformer';
import { IsNumber, IsString, IsDate, IsNotEmpty } from 'class-validator';
import { Status } from '../../gateway/estatus';
@Exclude()
export class ReadPeripheralDeviceDto {
    @Expose()
    @IsNotEmpty()
    @IsNumber()
    UID: number;
    @Expose()
    @IsNotEmpty()
    @IsString()
    vendor: string;
    @IsNotEmpty()
    @IsDate()
    date_created: Date;
    @IsNotEmpty()
    status: Status;
   
}