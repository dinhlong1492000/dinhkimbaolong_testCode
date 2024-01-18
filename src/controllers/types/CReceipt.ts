export type CReceiptCreate = {
  code: string;
  owe: number;
  have: number;
  form: number;
  invoice_id: number;
  receiving_party_id: number;
  delivering_party_id: number;
  warehouses_id: number;
  creator_name: string;
  deliver_name?: string;
  warehouseman_name?: string;
  accountant_name?: string
};
