import React from 'react';
import { Box, SvgIconProps } from '@mui/material';
import { IconWrapperProps, mapTypeToIcon } from './mapTypeToIcon';

const IconWrapper: React.FC<IconWrapperProps> = (props) => {
  const { type, isDark, isDisabled, sx, ...otherProps } = props;

  const iconSx = {
    color: isDark ? '#333' : isDisabled ? '#999' : '#000',
    ...sx,
  };

  return mapTypeToIcon[type] ? (
    <Box sx={{ width: 30, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      {mapTypeToIcon[type]({ ...otherProps, sx: iconSx } as SvgIconProps)}
    </Box>
  ) : (
    <Box>Icon type doesn't exist</Box>
  );
};

export default IconWrapper;
