import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { FC } from 'react';

type ActionControlProps = {
  secondaryButtonText: string;
  primaryButtonText?: string;
  onPrimaryButtonClick?: () => void;
  onSecondaryButtonClick?: () => void;
  hidePrimaryButton?: boolean;
  isDisabled?: boolean;
};

const ActionControl: FC<ActionControlProps> = (props) => {
  const {
    primaryButtonText,
    secondaryButtonText,
    onPrimaryButtonClick,
    onSecondaryButtonClick,
    hidePrimaryButton,
    isDisabled,
  } = props;
  return (
    <Box
      sx={{
        marginTop: 'auto',
        backgroundColor: 'var(--colorWhite)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        boxShadow: '0px 3px 20px #00000019',
        borderRadius: '1.125rem 1.125rem 0px 0px',
        padding: { xs: '1.563rem', sm: '3.625rem 1.563rem' },
        gap: { xs: '1rem', sm: '2.188rem', md: '3.125rem', lg: '7.5rem' },
        flexDirection: { xs: 'column-reverse', sm: 'row' },
      }}
    >
      <Button
        aria-label={secondaryButtonText}
        variant="outlined"
        color="primary"
        size="small"
        sx={{ width: '100%', maxWidth: '23rem' }}
        onClick={onSecondaryButtonClick}
      >
        {secondaryButtonText}
      </Button>
      {!hidePrimaryButton && (
        <Button
          aria-label={primaryButtonText}
          variant="contained"
          color="primary"
          size="small"
          sx={{ width: '100%', maxWidth: '23rem' }}
          onClick={onPrimaryButtonClick}
          disabled={isDisabled}
        >
          {primaryButtonText}
        </Button>
      )}
    </Box>
  );
};

export default ActionControl;
