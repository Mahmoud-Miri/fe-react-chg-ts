import { LoanFormField } from 'pages/forms/loanForm/types';
import { toTitleCase } from 'lib/shared/utils';
import * as React from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';

type CustomCheckboxFieldProps = {
  field: LoanFormField;
  changeHandler: (e: React.ChangeEvent<any>) => void;
  value: string;
};

const CustomCheckboxField: React.FC<CustomCheckboxFieldProps> = ({
  field,
  changeHandler,
  value,
}) => {
  return (
    <FormControlLabel
      control={
        <Checkbox
          name={field.name}
          value={value}
          onChange={changeHandler}
          color="primary"
        />
      }
      label={toTitleCase(field.name)}
    />
  );
};
export { CustomCheckboxField };
