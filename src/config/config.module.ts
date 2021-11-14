import { Module } from '@nestjs/common';
import { ConfingService } from './confing.service';

@Module({
    providers: [
        {
            provide: ConfingService,
            useValue: new ConfingService(),
        },
    ],
    exports: [ConfingService],
})
export class ConfigModule {}
