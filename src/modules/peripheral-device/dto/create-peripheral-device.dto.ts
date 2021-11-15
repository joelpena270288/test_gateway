import { Exclude, Expose, Type } from 'class-transformer';
import { IsNumber, IsString, IsDate, IsNotEmpty } from 'class-validator';
import { Status } from '../estatus';
@Exclude()
export class CreatePeripheralDeviceDto {
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
    @Expose()
    @IsNotEmpty()
    @IsString()
    Id_gateway: string;
}