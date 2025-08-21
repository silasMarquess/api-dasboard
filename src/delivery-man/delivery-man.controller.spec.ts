import { Test, TestingModule } from '@nestjs/testing';
import { DeliveryManController } from './delivery-man.controller';
import { DeliveryManService } from './delivery-man.service';

describe('DeliveryManController', () => {
  let controller: DeliveryManController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DeliveryManController],
      providers: [DeliveryManService],
    }).compile();

    controller = module.get<DeliveryManController>(DeliveryManController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
