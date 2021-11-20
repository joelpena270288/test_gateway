import { type } from 'os';
import {  Column,CreateDateColumn} from 'typeorm';
import { Status } from './estatus';

export class PeripheralDevice{   
    @Column({ unique: true, nullable: false })
    UID: number;
    @Column({ type: 'varchar', nullable: false })
    vendor: string;
    @Column({type: 'varchar', length: 7, nullable: false})
    status: string;
    @Column({type: Date, nullable: false,})
    date_created: Date;
    @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
    createdAt: Date;
    @CreateDateColumn({ type: 'timestamp', name: 'updated_at' })
    updatedAt: Date;
    constructor(UID: number, vendor: string, status: string,date_created: Date ) {       
        this.UID = UID;
        this.vendor = vendor;
        this.status = status;
        this.date_created = date_created;
    }

    
}