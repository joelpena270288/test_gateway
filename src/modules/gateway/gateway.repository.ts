import { Repository, EntityRepository } from 'typeorm';
import { Gateway } from './gateway.entity'; 

@EntityRepository(Gateway)
export class GatewayRepository extends Repository<Gateway>{ }