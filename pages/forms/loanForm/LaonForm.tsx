import * as React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import axios from 'axios';
import {
  ExtendedLoanFormGetResp,
  LoanFormField,
  LoanFormGetResp,
} from 'pages/forms/loanForm/types';
import { toTitleCase } from 'lib/shared/utils';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import { InputAdornment } from '@material-ui/core';
import { useFormik } from 'formik';
import {
  CustomCheckboxField,
  CustomSelectField,
  CustomTextField,
} from 'lib/shared/components/FormElements';
import {
  DecisionAlert,
  CopyRight,
} from 'lib/shared/components/FormAdornments/';

type LoanFormProps = {
  lenderSlug: string | undefined;
};

const LoanForm: React.FC<LoanFormProps> = ({ lenderSlug }) => {
  const [loanFormData, setLoanFormData] = useState<
    LoanFormGetResp | ExtendedLoanFormGetResp
  >();

  const [formikInitialValues, setFormikInitialValues] = useState<{
    [key: string]: string;
  }>({});

  const [applicationAccepted, setApplicationAccepted] =
    useState<boolean>(false);

  const [showDecisionAlert, setShowDecisionAlert] = useState<boolean>(false);

  useEffect(() => {
    const getRequiredFields = async () => {
      if (lenderSlug !== undefined) {
        try {
          await axios.get(`/api/lenders/${lenderSlug}`).then((r) => {
            setLoanFormData(r.data);
          });
        } catch (e) {
          //TODO Error handling
          console.log(e);
        }
      }
    };
    getRequiredFields();
  }, [lenderSlug]);

  useEffect(() => {
    const fields = loanFormData?.fields || [];
    if (fields.length) {
      const fieldNames = fields.map((f: LoanFormField | string) => {
        return typeof f === 'string' ? f : f.name;
      });
      const initialValues = fieldNames.reduce(
        (previousValue, currentValue) => ({
          ...previousValue,
          [currentValue]: '',
        }),
        {},
      );
      setFormikInitialValues(initialValues);
    }
  }, [loanFormData]);

  const formik = useFormik({
    initialValues: { ...formikInitialValues },
    //TODO leverage yup for validation
    // validationSchema: validationSchema,
    onSubmit: (values) => {
      axios.post(`/api/lenders/${lenderSlug}`, values).then(
        (response) => {
          formik.resetForm({ values: { ...formikInitialValues } });
          response.data.decision === 'accepted'
            ? setApplicationAccepted(true)
            : setApplicationAccepted(false);
          setShowDecisionAlert(true);
        },
        //TODO Error handling
        (error) => console.log(error),
      );
    },
  });

  const generateFields = () => {
    const fields = loanFormData?.fields;
    return fields?.map((f: string | LoanFormField, index: number) => {
      if (typeof f === 'string') {
        return generateSimpleField(f, index);
      } else {
        return generateEnhancedField(f, index);
      }
    });
  };

  const generateSimpleField = (fieldName: string, index: number) => {
    switch (fieldName) {
      case 'first_name':
      case 'last_name':
      case 'email':
        return (
          <CustomTextField
            key={fieldName}
            field={fieldName}
            index={index}
            type={'input'}
            changeHandler={formik.handleChange}
            value={formik.values[fieldName]}
          />
        );
      case 'date_of_birth':
        return (
          <CustomTextField
            key={fieldName}
            field={fieldName}
            index={index}
            type={'date'}
            changeHandler={formik.handleChange}
            value={formik.values[fieldName]}
          />
        );
      //  TODO Enhance CustomTextField to fit this case too
      case 'monthly_income':
        return (
          <TextField
            name={fieldName}
            key={fieldName}
            margin="normal"
            id={fieldName}
            required
            fullWidth
            label={toTitleCase(fieldName)}
            type="number"
            error={
              formik.values[fieldName] !== undefined &&
              Number(formik.values[fieldName]) < 0
            }
            value={formik.values[fieldName]}
            onChange={formik.handleChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AttachMoneyIcon />
                </InputAdornment>
              ),
            }}
            inputProps={{ step: 100, min: 0 }}
            defaultValue={0}
          />
        );
    }
  };

  const generateEnhancedField = (field: LoanFormField, index: number) => {
    switch (field.type) {
      case 'text':
        return (
          <CustomTextField
            key={field.name}
            type={'input'}
            field={field}
            index={index}
            value={formik.values[field.name]}
            changeHandler={formik.handleChange}
          />
        );
      case 'select':
        return (
          <CustomSelectField
            key={field.name}
            field={field}
            index={index}
            changeHandler={formik.handleChange}
            value={formik.values[field.name]}
          />
        );
      case 'checkbox':
        // TODO known formik bug on checkboxes. Replace or work around it
        return (
          <CustomCheckboxField
            key={field.name}
            field={field}
            changeHandler={formik.handleChange}
            value={formik.values[field.name]}
          />
        );
    }
  };

  const toggleAlert = () => {
    setShowDecisionAlert(!showDecisionAlert);
  };

  return (
    <Container component="main" maxWidth="sm">
      <CssBaseline />
      <Box
        marginTop={4}
        display="flex"
        flexDirection="column"
        alignItems="center"
      >
        <Box margin={1}>
          <Avatar>
            <AccountBalanceIcon />
          </Avatar>
        </Box>
        <Typography component="h1" variant="h5" align="center">
          {loanFormData?.name} Loan Application Form
        </Typography>
        <form onSubmit={formik.handleSubmit}>
          <Box marginTop={1}>
            {generateFields()}
            <Box marginTop={3} marginBottom={2}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
              >
                Submit
              </Button>
            </Box>
          </Box>
          <DecisionAlert
            message={
              applicationAccepted
                ? 'Congratulations! Your application has been accepted. A member\n' +
                  '                  of our team will contact you in the next 5 working days.'
                : 'Unfortunately, based on the information you provided, your\n' +
                  '                  application was declined.'
            }
            accepted={applicationAccepted}
            visible={showDecisionAlert}
            toggleVisibility={toggleAlert}
          />
        </form>
      </Box>
      <Box marginTop={1}>
        <CopyRight
          copyRightHolder={loanFormData?.name}
          link={useRouter().basePath}
        />
      </Box>
    </Container>
  );
};

export { LoanForm };
