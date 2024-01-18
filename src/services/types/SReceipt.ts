export type SReceipt = {
  password?: string;
  phone?: string;
  address?: string;
  avatar_url?: string;
  roles?: string[];
  permissions?: string[];
  created_at?: Date | null;
  updated_at?: Date | null;
  is_ctv?: boolean;
  date_of_birth?: Date | null;
  country?: string;
  city?: string;
  bank?: {
    cardholder_name?: string;
    name_bank?: string;
    number_bank?: string;
  };
};

export type SReceiptRequest = {
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

  accountant_name?: string;
};