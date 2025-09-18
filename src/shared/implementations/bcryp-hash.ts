import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import HashServiceGeneratorInterface from '../adpters/hash-generator.interface';

@Injectable()
export class BcrypService implements HashServiceGeneratorInterface {
  hashGenerator = async (passwordText: string): Promise<string> => {
    const hash = await bcrypt.hash(passwordText, 10);
    return hash;
  };
  async compareHash(passwordText: string, hash: string): Promise<boolean> {
    return bcrypt.compare(passwordText, hash);
  }
}
