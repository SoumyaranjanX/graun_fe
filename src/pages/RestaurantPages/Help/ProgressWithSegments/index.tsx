import React from 'react';
import { Box, Typography } from '@mui/material';

interface ProgressWithSegmentsProps {
  status: 'submitted' | 'progress' | 'resolved';
}

const ProgressWithSegments: React.FC<ProgressWithSegmentsProps> = ({ status }) => {
  const getSegmentColor = (segmentStatus: 'submitted' | 'progress' | 'resolved') => {
    if (segmentStatus === 'submitted' && (status === 'submitted' || status === 'progress' || status === 'resolved')) {
      return 'black';
    }
    if (segmentStatus === 'progress' && (status === 'progress' || status === 'resolved')) {
      return 'black';
    }
    if (segmentStatus === 'resolved' && status === 'resolved') {
      return 'black';
    }
    return '#c0c0c0';
  };

  const segments = [
    { label: 'Submitted', status: 'submitted' },
    { label: 'In progress', status: 'progress' },
    { label: 'Resolved', status: 'resolved' },
  ];

  return (
    <Box display="flex" justifyContent="space-between" mt={2}>
  {segments.map((segment:any) => (
    <Box key={segment.status} display="flex" flexDirection="column" alignItems="center" mb={1}>
      <Box
        width={100}
        height={5}
        bgcolor={getSegmentColor(segment.status)}
        borderRadius={4}
        mb={1}
      />
      <Typography variant="body2" color={getSegmentColor(segment.status)}>
        {segment.label}
      </Typography>
    </Box>
  ))}
</Box>
  );
};


export default ProgressWithSegments;
