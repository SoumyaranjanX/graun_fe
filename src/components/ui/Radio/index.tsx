import { SxProps, Typography } from '@mui/material';
import FormControlLabel from '@mui/material/FormControlLabel';
import MuiRadio from '@mui/material/Radio';
import MuiRadioGroup, { RadioGroupProps } from '@mui/material/RadioGroup';
import { MouseEventHandler, forwardRef } from 'react';

export type RadioItem = { value: string | number | boolean; label: string; subText?: string; sx?: SxProps };

type RadioProps = {
  items: RadioItem[];
  action?: MouseEventHandler;
} & RadioGroupProps;

type RefType = React.Ref<HTMLDivElement>;

// eslint-disable-next-line react/display-name
const Radio = forwardRef((props: RadioProps, ref: RefType) => {
  const { items, action, ...radioGroupProps } = props;
  return (
    <MuiRadioGroup {...radioGroupProps} ref={ref}>
      {items.map((item, index) => (
        <FormControlLabel
          key={`${item.label}-${index}`}
          value={item.value}
          onClick={action}
          control={<MuiRadio aria-label={item.label} />}
          label={
            <>
              <Typography component="span" sx={{ display: 'block' }}>
                {item.label}
              </Typography>
              {item?.subText && (
                <Typography
                  component="span"
                  sx={{
                    display: 'block',
                    fontSize: '0.688rem !important',
                    fontWeight: '500',
                    color: 'var(--colorTextSecondary) !important',
                    lineHeight: '1rem',
                  }}
                >
                  {item.subText}
                </Typography>
              )}
            </>
          }
          sx={item.sx}
        />
      ))}
    </MuiRadioGroup>
  );
});

export default Radio;
