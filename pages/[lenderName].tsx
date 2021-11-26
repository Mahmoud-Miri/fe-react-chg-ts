import { useRouter } from 'next/router';
import { Grid, ThemeProvider } from '@material-ui/core';
import { NextPage } from 'next';
import { LoanForm } from 'pages/forms/loanForm/LaonForm';
import { createTheme } from '@material-ui/core/styles';

const LenderNamePage: NextPage = () => {
  const router = useRouter();
  const lenderSlug = router.query.lenderName?.toString();
  const theme = createTheme();

  return (
    <ThemeProvider theme={theme}>
      <Grid container alignItems={'center'}>
        <LoanForm lenderSlug={lenderSlug} />
      </Grid>
    </ThemeProvider>
  );
};

export default LenderNamePage;
