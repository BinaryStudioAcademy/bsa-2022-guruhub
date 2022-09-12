type BillingCard = {
  id: string;
  object: string;
  address_city: string | null;
  address_country: string | null;
  address_line1: string | null;
  address_line1_check: string | null;
  address_line2: string | null;
  address_state: string | null;
  address_zip: string | null;
  address_zip_check: string | null;
  brand: string;
  country: string;
  cvc_check: string;
  dynamic_last4: string | null;
  exp_month: number;
  exp_year: number;
  funding: string;
  last4: string;
  metadata: object;
  name: string;
  tokenization_method: string | null;
};

export { type BillingCard };
