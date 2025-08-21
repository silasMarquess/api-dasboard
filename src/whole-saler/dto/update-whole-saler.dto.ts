import { PartialType } from '@nestjs/swagger';
import { CreateWholeSalerDto } from './create-whole-saler.dto';

export class UpdateWholeSalerDto extends PartialType(CreateWholeSalerDto) {}
