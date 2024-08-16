import Box from '@mui/material/Box';
import MuiBreadcrumbs, { BreadcrumbsProps } from '@mui/material/Breadcrumbs';
import Typography from '@mui/material/Typography';
import { FC } from 'react';

export type ItemType = {
  text: string;
  active?: boolean;
};

export type BreadCrumbProps = {
  items?: ItemType[];
} & BreadcrumbsProps;

const BasicBreadcrumbs: FC<BreadCrumbProps> = (props) => {
  const { items, sx, ...breadcrumbProps } = props;
  return (
    <Box role="presentation">
      <MuiBreadcrumbs
        aria-label="breadcrumb"
        sx={{
          fontSize: '0.938rem',
          fontWeight: '700',
          color: 'var(--darkText)',
          '& .MuiBreadcrumbs-separator': { margin: '0 0.75rem' },
          ...sx,
        }}
        {...breadcrumbProps}
      >
        {items?.map((crumb) => (
          <Typography
            component="span"
            color="inherit"
            key={crumb.text}
            sx={{ fontWeight: crumb.active ? 'bold' : 'normal', fontSize: '1.125rem' }}
          >
            {crumb.text}
          </Typography>
        ))}
      </MuiBreadcrumbs>
    </Box>
  );
};

export default BasicBreadcrumbs;
