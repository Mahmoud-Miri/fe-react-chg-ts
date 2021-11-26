import * as React from 'react';
import Alert from '@material-ui/lab/Alert';
import { Collapse, IconButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { AlertTitle } from '@material-ui/lab';
import Typography from '@material-ui/core/Typography';

type DecisionAlertProps = {
  message: string;
  accepted: boolean;
  visible: boolean;
  toggleVisibility: () => void;
};

const DecisionAlert: React.FC<DecisionAlertProps> = ({
  message,
  accepted,
  visible,
  toggleVisibility,
}) => {
  return (
    <Collapse in={visible}>
      <Alert
        severity={accepted ? 'success' : 'error'}
        action={
          <IconButton
            aria-label="close"
            color="inherit"
            size="small"
            onClick={toggleVisibility}
          >
            <CloseIcon fontSize="inherit" />
          </IconButton>
        }
      >
        <AlertTitle>{accepted ? 'Accepted' : 'Declined'}</AlertTitle>
        <Typography variant="body2" align="left">
          {message}
        </Typography>
      </Alert>
    </Collapse>
  );
};

export { DecisionAlert };
