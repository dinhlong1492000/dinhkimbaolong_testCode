import Repository, { BaseTransaction } from "@n-repositories/Repository";
import ReceiptModel from "@n-models/Receipt";
import { IReceiptRepository } from "@n-repositories/interfaces/v1";
import { AnyQueryBuilder } from "objection";

export class ReceiptRepository
  extends Repository<typeof ReceiptModel>
  implements IReceiptRepository
{
  initializeModel(): typeof ReceiptModel {
    return ReceiptModel;
  }
  transacting(trx: BaseTransaction): IReceiptRepository {
    const repositoryTransaction = new ReceiptRepository(trx.transaction);
    return repositoryTransaction;
  }

  async getReceipt(id: number): Promise<typeof ReceiptModel['prototype']> {
    const query = this.model.query().first()
    const result : any = await query 
    return result
  }

}
