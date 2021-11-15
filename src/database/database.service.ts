import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '../config/config.module';
import { ConfingService } from '../config/confing.service';
import { Connection, ConnectionOptions} from 'typeorm';
import { type } from 'os';
import { Configuration } from 'src/config/config.key';
export const databaseProviders = [
    TypeOrmModule.forRootAsync({
        imports: [ConfigModule],
        inject: [ConfingService],
        async useFactory(config: ConfingService) {
            return {
                //ssl: true,
                //type: 'mongodb' as 'mongodb',
                //host: config.get(Configuration.HOST),
                //username: config.get(Configuration.USER),
                //password: config.get(Configuration.PASSWORD),
                database: "gateways",
               // port: 27017,

                type: "mongodb",
    host: "localhost",
    port: 27017,
    //database: "test"
                entities: [__dirname + '/../**/*.entity{.ts,.js}'],
                migrations: [__dirname + '/migrations/*{.ts,.js}'],
            } as ConnectionOptions;
         }

    })
]