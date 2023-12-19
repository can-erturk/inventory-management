import { createHash } from 'crypto';

export const sha256 = (text) => {
  return createHash('sha256').update(text).digest('hex');
};
