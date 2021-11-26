import { LoanFormField } from 'pages/forms/loanForm/types';
import { toTitleCase } from 'lib/shared/utils';
import * as React from 'react';
import {
  FormControl,
  InputLabel,
  makeStyles,
  MenuItem,
  Select,
} from '@material-ui/core';

type CustomSelectFieldProps = {
  field: LoanFormField;
  index: number;
  changeHandler: (e: React.ChangeEvent<any>) => void;
  value: string;
};

const CustomSelectField: React.FC<CustomSelectFieldProps> = ({
  field,
  index,
  changeHandler,
  value,
}) => {
  const useStyles = makeStyles((theme) => ({
    formControl: {
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(2),
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }));

  const classes = useStyles();

  return (
    <FormControl
      fullWidth
      className={classes.formControl}
      required={field.required}
    >
      <InputLabel id={`${field.name}-label`}>
        {toTitleCase(field.name)}
      </InputLabel>
      <Select
        name={field.name}
        fullWidth
        labelId={`${field.name}-label`}
        autoFocus={index === 0}
        id={field.name}
        value={value}
        onChange={changeHandler}
        defaultValue={field.options?.length ? field.options[0] : ''}
      >
        {field.options?.map((o) => (
          <MenuItem value={o} key={o}>
            {o}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
export { CustomSelectField };
