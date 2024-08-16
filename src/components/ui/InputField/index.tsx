import SVGIcon from '@/assets/icons';
import { InputAdornment } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField, { TextFieldProps } from '@mui/material/TextField';
import { forwardRef } from 'react';

export type InputFieldProps = {
  actionButtonLabel?: string;
  onActionClick?: () => void;
  isVerified?: boolean;
} & TextFieldProps;

type RefType = React.Ref<HTMLDivElement>;

// eslint-disable-next-line react/display-name
const InputField = forwardRef((props: InputFieldProps, ref: RefType) => {
  const { actionButtonLabel, onActionClick, isVerified, ...textFieldProps } = props;

  return (
    <Box sx={{ position: 'relative' }}>
      <TextField
        {...textFieldProps}
        ref={ref}
        {...(isVerified && {
          InputProps: {
            endAdornment: (
              <InputAdornment position="end">
                <Box
                  sx={{
                    width: '0.875rem',
                    height: '0.875rem',
                    borderRadius: '50%',
                    background: 'var(--colorPrimary)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <SVGIcon name="tick" />
                </Box>
              </InputAdornment>
            ),
          },
        })}
      />
      {actionButtonLabel && (
        <Box display="flex" mt="0" sx={{ position: 'absolute', top: '2.813rem', right: 0 }}>
          <Button
            aria-label={actionButtonLabel}
            variant="text"
            sx={{ padding: 0, ml: 'auto', color: 'var(--colorTextPrimary)', textDecoration: 'underline' }}
            disableRipple
            onClick={onActionClick}
          >
            {actionButtonLabel}
          </Button>
        </Box>
      )}
    </Box>
  );
});

export default InputField;
