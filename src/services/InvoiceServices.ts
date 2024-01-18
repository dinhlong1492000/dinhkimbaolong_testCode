import { inject, injectable } from "inversify";
import { IInvoiceServices } from "./interfaces/IInvoiceServices";
import { SInvoice } from "./types";
import { REPOSITORIES } from "@n-types/injections/repositories";
import { IInvoiceRepository } from "@n-repositories/interfaces/v1";
import { InternalError, NotFoundError } from "@n-errors/HttpError";

@injectable()
export class InvoiceServices implements IInvoiceServices {
  @inject(REPOSITORIES.InvoiceRepository)
  private invoiceRepository: IInvoiceRepository;

  public async getInvoice(id: number): Promise<SInvoice> {
    try {
      const receipts = await this.invoiceRepository.getInvoice(id);
      if (!receipts) {
        throw new NotFoundError("receipts not found");
      }
      return receipts;
    } catch (error: any) {
      throw new InternalError("Internal server error.");
    }
  }
}
