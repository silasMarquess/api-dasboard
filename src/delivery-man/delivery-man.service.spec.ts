import { Test, TestingModule } from '@nestjs/testing';
import { DeliveryManService } from './delivery-man.service';

describe('DeliveryManService', () => {
  let service: DeliveryManService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DeliveryManService],
    }).compile();

    service = module.get<DeliveryManService>(DeliveryManService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
