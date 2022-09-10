import React from 'react';
import Box from '@mui/material/Box';

export const Display = ({ value, onInputChange }) => {
  return (
    <Box
        as="input"
        height="100px"
        width="200px"
        value={value} 
        onChange={(event)=> onInputChange(event.target.value)}
        margin="4px"
        fontSize="48px"
        textAlign="end"
    />
  )
}
