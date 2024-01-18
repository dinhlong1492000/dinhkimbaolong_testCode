import DetailInvoice from "@n-models/InvoiceProduct";

export type CInvoice = {
  cost: number;
  biller_id: number;
  detail: (typeof DetailInvoice)["prototype"][];
};