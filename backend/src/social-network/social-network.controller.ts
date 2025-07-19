import { Controller, Get, Param } from '@nestjs/common';
import { SocialNetworkService } from './social-network.service';
import { SocialNetwork } from './schemas/social-network.schema';

@Controller('social-networks')
export class SocialNetworkController {
  constructor(private readonly socialNetworkService: SocialNetworkService) {}

  @Get()
  async findAll(): Promise<SocialNetwork[]> {
    return this.socialNetworkService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<SocialNetwork | null> {
    return this.socialNetworkService.findById(id);
  }
} 