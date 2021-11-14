import { Type } from 'class-transformer';
import { IsNumber, IsString, IsDate, IsNotEmpty } from 'class-validator';
import { Status } from '../estatus';
export class PeripheralDeviceDto {
    @IsNotEmpty()
    @IsString()
    UID: string;
    @IsNotEmpty()
    @IsString()
    vendor: string;
    @IsNotEmpty()
    @IsDate()
    date_created: Date;
    @IsNotEmpty()
    status: Status;
}