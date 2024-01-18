import Repository, { BaseTransaction } from "@n-repositories/Repository";
import InvoiceModel from "@n-models/Invoice";
import { IInvoiceRepository } from "@n-repositories/interfaces/v1";
import { CInvoice } from "@n-repositories/types";

export class InvoiceRepository
  extends Repository<typeof InvoiceModel>
  implements IInvoiceRepository
{
  initializeModel(): typeof InvoiceModel {
    return InvoiceModel;
  }
  transacting(trx: BaseTransaction): IInvoiceRepository {
    const repositoryTransaction = new InvoiceRepository(trx.transaction);
    return repositoryTransaction;
  }

  async getInvoice(id: number): Promise<CInvoice> {
    const query = this.model
      .query()
      .where("invoices.id", id)
      .withGraphFetched("invoices_products")
      .modifyGraph("invoices_products", (builder) => {
        builder
          .select(
            "products.id as product_code",
            "products.name as product_name",
            "products.price as product_price",
            "products.unit as product_unit",
            "invoices_products.*"
          )
          .join("products", "invoices_products.product_id", "products.id");
      });
    const result: any = await query;
    return result;
  }
}
