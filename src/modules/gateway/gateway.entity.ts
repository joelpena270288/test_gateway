import { type } from 'os';
import { BaseEntity, Entity, Column, ObjectIdColumn, CreateDateColumn} from 'typeorm';
import { PeripheralDevice } from './peripheral-device.entity';
@Entity('gateways')
export class Gateway extends BaseEntity {
    @ObjectIdColumn()
    id: string;
    @Column({type: 'varchar',unique: true, nullable: false})
    serial_number: string;
    @Column({type: 'varchar', nullable: false})
    name: string;
    @Column({ type: 'varchar', length: 15, nullable: false })
    IPv4: string;   
    @Column(type => PeripheralDevice)    
    peripherals_devices: PeripheralDevice[];    
    @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
    createdAt: Date;
    @CreateDateColumn({ type: 'timestamp', name: 'updated_at' })
    updatedAt: Date;

}