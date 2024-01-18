import { SReceiptRequest, SReceipt } from "@n-services/types";

export interface IReceiptServices {
  getReceipt(id: number): Promise<SReceipt>;
  createReceipt(data: SReceiptRequest): Promise<SReceiptRequest>;
}
