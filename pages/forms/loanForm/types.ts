type LoanFormGetResp = {
  name: string;
  fields: Array<
    | 'first_name'
    | 'last_name'
    | 'email'
    | 'date_of_birth'
    | 'monthly_income'
    | 'gender'
    | 'address'
  >;
};

type ExtendedLoanFormGetResp = {
  name: string;
  fields: LoanFormField[];
};

type LoanFormField = {
  name: string;
  type: string;
  required: boolean;
  options?: string[];
};

export type { LoanFormGetResp, LoanFormField, ExtendedLoanFormGetResp };
