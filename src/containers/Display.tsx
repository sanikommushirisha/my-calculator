import React from 'react';
import Box from '@mui/material/Box';

interface DisplayProps {
  value: Number,
  onInputChange: (value: Number) => void
}
export const Display = ({ value, onInputChange }: DisplayProps) => {
  const handleChange = (event) => {
    onInputChange(event.target.value)
  }
  return (
    <Box
        as="input"
        type="number"
        step="any"
        value={value} 
        onChange={handleChange}
        sx= {{
          textAlign: "end",
          margin:"4px",
          fontSize:"48px",
          height:"100px",
          width:"200px"
        }}
    />
  )
}
