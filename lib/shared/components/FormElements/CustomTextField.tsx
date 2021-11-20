import { LoanFormField } from 'pages/forms/loanForm/types';
import TextField from '@material-ui/core/TextField';
import { toTitleCase } from 'lib/shared/utils';
import * as React from 'react';

type CustomTextFieldProps = {
  field: string | LoanFormField;
  index: number;
  changeHandler: (e: React.ChangeEvent<any>) => void;
  value: string;
  type: 'input' | 'date';
};

const CustomTextField: React.FC<CustomTextFieldProps> = ({
  field,
  index,
  changeHandler,
  value,
  type,
}) => {
  if (typeof field === 'string') {
    return (
      <TextField
        margin="normal"
        required
        fullWidth
        id={field}
        label={toTitleCase(field)}
        name={field}
        type={type}
        value={value}
        onChange={changeHandler}
        autoFocus={index === 0}
        defaultValue={value ?? ''}
        InputLabelProps={
          type === 'date'
            ? {
                shrink: true,
              }
            : {}
        }
      />
    );
  } else {
    return (
      <TextField
        margin="normal"
        required={field.required}
        fullWidth
        id={field.name}
        label={toTitleCase(field.name)}
        name={field.name}
        type={type}
        value={value}
        onChange={changeHandler}
        autoFocus={index === 0}
        defaultValue={value ?? ''}
        InputLabelProps={
          type === 'date'
            ? {
                shrink: true,
              }
            : {}
        }
      />
    );
  }
};
export { CustomTextField };
