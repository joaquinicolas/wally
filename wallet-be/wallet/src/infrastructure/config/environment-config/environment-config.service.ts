import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ConfigApp } from 'src/domain/config/config';

@Injectable()
export class EnvironmentConfigService implements ConfigApp {
  constructor(private configService: ConfigService) {}
  getAPIKey(): string {
    return this.configService.get<string>('API_KEY');
  }
  getExternalServiceBaseURL(): string {
    return this.configService.get<string>('EXTERNAL_SERVICE_BASE_URL');
  }
}
