import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '../config/config.module';
import { ConfingService } from '../config/confing.service';
import { Connection, ConnectionOptions} from 'typeorm';
import { type } from 'os';
import { Configuration } from 'src/config/config.key';
//Connection to the databases 
export const databaseProviders = [
    TypeOrmModule.forRootAsync({
        imports: [ConfigModule],
        inject: [ConfingService],
        async useFactory(config: ConfingService) {
            return {              

                type: "mongodb",
                database: config.get(Configuration.DATABASE), 
                host: config.get(Configuration.HOST),
                port: 27017,
   
                entities: [__dirname + '/../**/*.entity{.ts,.js}'],
                migrations: [__dirname + '/migrations/*{.ts,.js}'],
            } as ConnectionOptions;
         }

    })
]