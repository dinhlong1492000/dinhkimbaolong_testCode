import Receipt from '@n-models/Receipt';

import IRepository from '../IRepository';

export interface IReceiptRepository extends IRepository<typeof Receipt> {
  getReceipt(id: number): Promise<typeof Receipt['prototype']>
}
