import { type } from 'os';
import { BaseEntity, Entity, Column, ObjectIdColumn, CreateDateColumn, OneToMany } from 'typeorm';
import { PeripheralDevice } from '../peripheral-device/peripheral-device.entity';
@Entity('gateways')
export class Gateway extends BaseEntity {
    @ObjectIdColumn()
    id: string;
    @Column({type: 'varchar',unique: true, nullable: false})
    serial_number: string;
    @Column({type: 'varchar', nullable: false})
    name: string;
    @Column({ type: 'varchar', length: 12, nullable: false })
    IPv4: string;   
    @OneToMany(() => PeripheralDevice, peripheral_device => peripheral_device.gateway)
    peripheral_device: PeripheralDevice[];

    
    @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
    createdAt: Date;
    @CreateDateColumn({ type: 'timestamp', name: 'updated_at' })
    updatedAt: Date;

}