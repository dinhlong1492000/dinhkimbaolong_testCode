import { inject, injectable } from "inversify";
import { IReceiptServices } from "./interfaces/IReceiptServices";
import { SReceipt, SReceiptRequest } from "./types";
import { REPOSITORIES } from "@n-types/injections/repositories";
import {
  ICompanyRepository,
  IInvoiceRepository,
  IReceiptRepository,
  IWarehouseRepository,
} from "@n-repositories/interfaces/v1";
import {
  BadRequestError,
  InternalError,
  NotFoundError,
} from "@n-errors/HttpError";

@injectable()
export class ReceiptServices implements IReceiptServices {
  @inject(REPOSITORIES.ReceiptRepository)
  private receiptRepository: IReceiptRepository;

  @inject(REPOSITORIES.InvoiceRepository)
  private invoiceRepository: IInvoiceRepository;

  @inject(REPOSITORIES.WarehouseRepository)
  private warehouseRepository: IWarehouseRepository;

  @inject(REPOSITORIES.CompanyRepository)
  private companyRepository: ICompanyRepository;

  public async getReceipt(id: number): Promise<SReceipt> {
    try {
      const receipts = await this.receiptRepository.getReceipt(id);
      if (!receipts) {
        throw new NotFoundError("receipts not found");
      }
      return receipts;
    } catch (error) {
      throw new InternalError("Internal server error.");
    }
  }

  public async createReceipt(data: SReceiptRequest): Promise<SReceiptRequest> {
    try {
      // tạo receipt
      const {
        invoice_id,
        receiving_party_id,
        delivering_party_id,
        warehouses_id,
        creator_name,
        deliver_name,
        warehouseman_name,
        accountant_name,
        ...receipt
      } = { ...data };

      // check invoice
      const invoice = await this.invoiceRepository.findById(invoice_id);
      if (!invoice) {
        throw new BadRequestError("Invoice not found.");
      }

      // check warehouse
      const warehouse = await this.warehouseRepository.findById(warehouses_id);
      if (!warehouse) {
        throw new BadRequestError("warehouse not found.");
      }

      // check receiving_party_id
      const receivingParty = await this.companyRepository.findById(
        receiving_party_id
      );
      if (!receivingParty) {
        throw new BadRequestError("receivingParty not found.");
      }

      // check deliveringParty
      const deliveringParty = await this.companyRepository.findById(
        warehouses_id
      );
      if (!deliveringParty) {
        throw new BadRequestError("deliveringParty not found.");
      }
      const receipts = await this.receiptRepository.create(data);
      return receipts;
    } catch (error: any) {
      throw new InternalError("Internal server error.");
    }
  }
}
