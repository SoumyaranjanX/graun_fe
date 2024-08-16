import { CircularProgress, Paper, CircularProgressProps } from '@mui/material';
import { FC } from 'react';

type PageLoaderProps = CircularProgressProps;

const PageLoader: FC<PageLoaderProps> = ({ size = 22, color = 'primary', ...rest }) => {
  return (
    <Paper
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
        zIndex: 9999,
      }}
    >
      <CircularProgress size={size} color={color} {...rest} />
    </Paper>
  );
};

export default PageLoader;
