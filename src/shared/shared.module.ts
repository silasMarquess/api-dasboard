import { Module } from '@nestjs/common';
import { SharedService } from './shared.service';
import { SharedController } from './shared.controller';
import { BcrypService } from './implementations/bcryp-hash';

@Module({
  controllers: [SharedController],
  providers: [
    SharedService,
    {
      provide: 'hashService',
      useClass: BcrypService,
    },
  ],
  exports: ['hashService'],
})
export class SharedModule {}
