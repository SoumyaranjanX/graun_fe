import { Box, Typography } from '@mui/material';

type FormGroupViewType = {
  label?: string;
  value: React.ReactNode;
};

function FormGroupView(props: FormGroupViewType) {
  return (
    <Box sx={{ '& + .MuiBox-root': { marginTop: '0.5rem' } }}>
      {props.label && (
        <Typography
          component="span"
          sx={{
            display: 'block',
            fontSize: '0.875rem',
            fontWeight: 500,
            color: 'var(--colorTextSecondary)',
            marginBottom: '0.5rem',
            lineHeight: 1,
          }}
        >
          {props.label}
        </Typography>
      )}
      <Typography
        component="span"
        sx={{
          display: 'block',
          fontSize: '0.875rem',
          fontWeight: 500,
          color: 'var(--colorTextPrimary)',
          lineHeight: '1',
        }}
      >
        {props.value}
      </Typography>
    </Box>
  );
}

export default FormGroupView;
