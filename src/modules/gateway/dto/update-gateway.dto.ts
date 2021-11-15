import { Exclude, Expose, Type } from 'class-transformer';
import { IsNumber, IsString, IsNotEmpty} from 'class-validator';

@Exclude()
export class UpdateGatewayDto {
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
   
    

    
}