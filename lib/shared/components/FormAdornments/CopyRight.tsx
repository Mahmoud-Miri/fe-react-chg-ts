import * as React from 'react';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';

type copyRightProps = {
  copyRightHolder: string | undefined;
  link: string;
};

const CopyRight: React.FC<copyRightProps> = ({
  copyRightHolder,
  link,
  children,
}) => {
  return (
    <Typography variant="body2" align="center">
      {'Copyright © '}
      <Link color="inherit" href={link}>
        {copyRightHolder}
        {children}
      </Link>{' '}
      {new Date().getFullYear()}
    </Typography>
  );
};

export { CopyRight };
