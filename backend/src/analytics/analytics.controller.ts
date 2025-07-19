import { Controller, Get, Param } from '@nestjs/common';
import { AnalyticsService } from './analytics.service';

@Controller('analytics')
export class AnalyticsController {
  constructor(private readonly analyticsService: AnalyticsService) {}

  @Get('social-network/:socialNetworkId')
  async getSocialNetworkStats(@Param('socialNetworkId') socialNetworkId: string) {
    return this.analyticsService.getSocialNetworkStats(socialNetworkId);
  }

  @Get('total')
  async getTotalStats() {
    return this.analyticsService.getTotalStats();
  }
} 