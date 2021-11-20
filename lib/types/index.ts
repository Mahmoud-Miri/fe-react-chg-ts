export interface LenderGetResponse {
  name: string;
  fields: Array<
    | 'address'
    | 'date_of_birth'
    | 'email'
    | 'first_name'
    | 'gender'
    | 'last_name'
    | 'monthly_income'
  >;
}

export interface LenderGetResponseExtended {
  name: string;
  fields: Array<LenderField>;
}

export interface LenderField {
  name: string;
  type: string;
  required: boolean;
  options?: Array<string>;
}

export interface LenderPostResponse {
  decision: 'accepted' | 'declined';
}
