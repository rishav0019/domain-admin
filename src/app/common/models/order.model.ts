
export interface Order {
  id?: string;
  paymentId?: string;
  amount?: string;
  description?: string;
  currency?: string;
  status?: string;
  payer_id?: string;
  payer_email?: string;
  payer_address?: string;
  account?: Account;
  creationDate?: Date;
  modificationDate?: Date;
}
