import { SInvoice } from "@n-services/types";

export interface IInvoiceServices {
  getInvoice(id: number): Promise<SInvoice>;
}
