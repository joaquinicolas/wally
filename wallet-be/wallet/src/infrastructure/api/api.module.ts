import { Module } from '@nestjs/common';
import { Etherscan } from './etherscan';
import { EnvironmentConfigModule } from '../config/environment-config/environment-config.module';
import { EnvironmentConfigService } from '../config/environment-config/environment-config.service';

@Module({
  imports: [EnvironmentConfigModule],
  providers: [
    {
      provide: Etherscan,
      useFactory: (configService: EnvironmentConfigService) => {
        const apiKey = configService.getAPIKey();
        return new Etherscan(apiKey);
      },
      inject: [EnvironmentConfigService],
    },
  ],
  exports: [Etherscan],
})
export class APIModule {}
