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
    @Expose()
    @IsNotEmpty()
    @IsDate()
    @Type(() => Date)
    date_created: Date;
    
    @Expose()
    @IsNotEmpty()    
    status: Status;
   
}