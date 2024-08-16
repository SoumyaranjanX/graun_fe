import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { FormHelperText } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MuiSelect, { SelectProps } from '@mui/material/Select';
import { forwardRef } from 'react';

export type SelectInputProps = {
  id: string;
  label: string;
  helperText?: string;
} & SelectProps;

type RefType = React.Ref<HTMLDivElement>;

// eslint-disable-next-line react/display-name
const Select = forwardRef((props: SelectInputProps, ref: RefType) => {
  const { id, label, children, error, helperText, ...selectProps } = props;

  return (
    <FormControl sx={{ display: 'flex' }}>
      <InputLabel id={`${id}-select-label`} htmlFor={`${id}-input-id`} shrink>
        {label}
      </InputLabel>
      <MuiSelect
        ref={ref}
        labelId={`${id}-select-label`}
        id={id}
        IconComponent={ExpandMoreIcon}
        label={label}
        inputProps={{ id: `${id}-input-id` }}
        error={error}
        {...selectProps}
      >
        {children}
      </MuiSelect>
      <FormHelperText error={error}>{helperText}</FormHelperText>
    </FormControl>
  );
});

export default Select;
