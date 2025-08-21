import { Test, TestingModule } from '@nestjs/testing';
import { WholeSalerService } from './whole-saler.service';

describe('WholeSalerService', () => {
  let service: WholeSalerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WholeSalerService],
    }).compile();

    service = module.get<WholeSalerService>(WholeSalerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
