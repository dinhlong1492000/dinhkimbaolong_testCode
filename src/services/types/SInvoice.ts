import DetailInvoice from "@n-models/InvoiceProduct";

export type SInvoice = {
  cost: number;
  biller_id: number;
  detail: (typeof DetailInvoice)["prototype"][];
};
