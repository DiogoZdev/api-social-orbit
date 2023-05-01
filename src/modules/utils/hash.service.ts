import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class HashService {
  async hashString(data: string) {
    console.time('hash');
    const hash = await bcrypt.hash(data, 14);
    console.timeEnd('hash');
    return hash;
  }
}