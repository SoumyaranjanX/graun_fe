import { getSVG } from '@/assets/icons/index';
import { createSvgIcon } from '@mui/material';
import { DatePickerProps, DatePicker as MuiDatePicker } from '@mui/x-date-pickers/DatePicker';
import { useState } from 'react';

const calenderSvgIcon = createSvgIcon(getSVG('calendar'), 'CustomIcon');

export type InputFieldProps = {
  onChange?: (date: Date | null) => void;
  placeholder: string;
  hasError: boolean;
  textFieldOnBlur?: React.FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>;
} & DatePickerProps<Date>;

const DatePicker = (props: InputFieldProps) => {
  const { onChange, placeholder, hasError, textFieldOnBlur, ...datePickerProps } = props;
  const [open, setOpen] = useState(false);
  return (
    <MuiDatePicker
      {...datePickerProps}
      onChange={onChange}
      slots={{ openPickerIcon: calenderSvgIcon }}
      slotProps={{
        textField: {
          placeholder: placeholder,
          fullWidth: true,
          error: hasError,
          onBlur: textFieldOnBlur,
          disabled: open,
          // onFocus: () => setOpen(true),
        },
        openPickerButton: {
          sx: {
            width: '36px !important ',
            height: '36px !important',
            '& .MuiSvgIcon-root': {
              color: 'var(--colorPrimary) !important',
              height: '24px !important',
              width: '24px !important',
              ml: 0.8,
              mt: 0.5,
            },
          },
        },
        previousIconButton: {
          sx: {
            '& .MuiSvgIcon-root': {
              height: '1em !important',
              width: '1em !important',
            },
          },
        },
        nextIconButton: {
          sx: {
            '& .MuiSvgIcon-root': {
              height: '1em !important',
              width: '1em !important',
            },
          },
        },
      }}
      open={open}
      onOpen={() => setOpen(true)}
      onClose={() => setOpen(false)}
      aria-label="Date picker"
    />
  );
};

export default DatePicker;
