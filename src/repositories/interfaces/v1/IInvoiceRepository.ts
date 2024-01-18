import Invoice from '@n-models/Invoice';
import {CInvoice} from '@n-repositories/types';

import IRepository from '../IRepository';

export interface IInvoiceRepository extends IRepository<typeof Invoice> {
  getInvoice(id: number): Promise<CInvoice>
}
