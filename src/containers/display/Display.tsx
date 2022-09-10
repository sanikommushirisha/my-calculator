import React from 'react';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';

export const Display = ({ value, setValue }) => {
  return (
    <Box
        as="input"
        height="100px"
        width="200px"
        value={value} 
        onChange={(event)=> setValue(event.target.value)}
        margin="4px"
        fontSize="48px"
        textAlign="end"
    />
  )
}
