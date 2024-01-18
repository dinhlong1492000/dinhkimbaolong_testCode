export type SUserRequest = {
  email: string;
  username: string;
  password?: string;
  phone?: string;
  address?: string;
  avatar_url?: string;
  roles?:  string[];
  permissions?:  string[];
  created_at?: Date | null;
  updated_at?: Date | null;
  is_ctv?: boolean;
  date_of_birth?: Date | null;
  country?: string;
  city?: string;
  bank?: {
    cardholder_name?: string,
    name_bank?: string,
    number_bank?: string,
  }
};