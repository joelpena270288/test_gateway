import { type } from 'os';
import { BaseEntity, Entity, Column, ObjectIdColumn, CreateDateColumn, ManyToOne } from 'typeorm';
import { Status } from './estatus';
import { Gateway } from '../gateway/gateway.entity';
@Entity('peripherals-devices')
export class PeripheralDevice extends BaseEntity {
    @ObjectIdColumn()
    id: number;
    @Column({ unique: true, nullable: false })
    UID: number;
    @Column({ type: 'varchar', nullable: false })
    vendor: string;
    @Column({type: 'varchar', length: 7, nullable: false})
    status: string;
    @Column({type: Date, nullable: false,})
    date_created: Date;
   
    @ManyToOne(() => Gateway, gateway => gateway.peripheral_device, { cascade: true, onDelete: 'CASCADE',})
    
    gateway: Gateway;   
    @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
    createdAt: Date;
    @CreateDateColumn({ type: 'timestamp', name: 'updated_at' })
    updatedAt: Date;

    
}