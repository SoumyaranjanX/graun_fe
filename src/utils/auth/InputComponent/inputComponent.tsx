import React, { useState, ChangeEvent, FC, HTMLInputAutoCompleteAttribute } from 'react';
import { TextField, InputAdornment, IconButton, Box, Typography } from '@mui/material';
import eye from '../../../assets/icons/eye.svg';
import eye2 from '../../../assets/icons/eye2.svg';
import { useForm } from 'react-hook-form';

interface Props {
  label?: string;
  labelStyle?: React.CSSProperties;
  placeholder?: string;
  icon?: boolean;
  required?: boolean;
  isRequiredFailed?: boolean;
  validationEnabled?: Object;
  errorMessage?: string;
  type?: string;
  value?: string | number;
  name: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: ChangeEvent<HTMLInputElement>) => void;
  register?: any;
  disabled?: boolean;
  min?: string | number;
  max?: string | number;
  item: any;
  errors?: any;
  inputWidth?: string;
  variant?: 'outlined';
  mainInputStyle?: React.CSSProperties;
}

const InputComponent: FC<Props> = ({
  label,
  labelStyle,
  placeholder,
  icon,
  required,
  isRequiredFailed,
  validationEnabled,
  errorMessage,
  type,
  value,
  name,
  onChange,
  onBlur,
  register,
  disabled,
  min,
  max,
  item,
  errors,
  mainInputStyle,
  variant = 'outlined',
}) => {
  const [isPasswordVisible, setPasswordVisible] = useState<boolean>(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!isPasswordVisible);
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      <Box style={labelStyle}>
        <label>{label}</label>
      </Box>
      <Box width="100%" style={mainInputStyle} p={1}>
        <TextField
          margin="none"
          size="small"
          variant={variant}
          autoComplete="off"
         // autoFocus={true}
          fullWidth
          required={required}
          id={name}
          name={name}
          {...register(name, validationEnabled)}
          type={!isPasswordVisible ? type : 'text'}
          placeholder={placeholder}
          value={value}
          min={min ? parseInt(min.toString()) : undefined}
          max={max ? parseInt(max.toString()) : undefined}
          onChange={onChange}
          //onBlur={onBlur}
          disabled={disabled}
          InputProps={{
            endAdornment: icon && (
              <InputAdornment position="end">
                <IconButton onClick={togglePasswordVisibility}>
                  <img
                    src={isPasswordVisible ? eye : eye2}
                    alt="Password visibility"
                    style={{ width: 20, height: 20 }}
                  />
                </IconButton>
              </InputAdornment>
            ),
            sx: {
              borderRadius: '50px',
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: 'black',
              },
              '&:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: 'black',
              },
              '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: 'black',
              },
              // Custom styles to hide the native password visibility icon
              '& input::-ms-reveal, & input::-ms-clear': {
                display: 'none',
              },
            },
          }}
        />
      </Box>
      {errorMessage && errors?.hasOwnProperty(name) && (
        <Typography variant="body2" color="error" mt={1}>
          {errorMessage}
        </Typography>
      )}
    </Box>
  );
};

export default InputComponent;
