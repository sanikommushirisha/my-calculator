import React from 'react';
import { Typography, Box } from '@mui/material';

class ErrorBoundary extends React.Component {
    constructor(props) {
      super(props);
      this.state = { hasError: false };
    }
  
    componentDidCatch(error, errorInfo) {
      console.log(error, errorInfo);
    }
  
    render() {
      if (this.state.hasError) {
        return (<Box m={10} p={2} border="1px solid black">
          <Typography variant="h1"> Something went wrong. Check logs for more detail </Typography>
        </Box>);
      }
  
      return this.props.children; 
    }
};

export default ErrorBoundary;
