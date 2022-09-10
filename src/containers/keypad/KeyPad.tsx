import React from 'react';
import { Button } from '../../components/button';
import Grid from '@mui/material/Grid';
import { functionKeys, numericKeys, lastRowKeys, operatorKeys } from './keys';

export const Keypad = (props) => {
  const { onKeyClick } = props;
  return (
    <Grid display="flex" flexDirection="row" gap="4px">
      <Grid display="flex" flexDirection="column" gap="4px">
        <Grid
          display="grid"
          gap="4px"
          sx={{ gridTemplateColumns: 'auto auto auto', width: 'fit-content' }}
        >
          {functionKeys.map((functionKey) => (
            <Button
              key={functionKey.label}
              palette="light"
              onClick={() =>  onKeyClick(functionKey.value, 'fx')}
            >
              {functionKey.label}
            </Button>
          ))}
        </Grid>
        <Grid display="grid" sx={{ gridTemplateColumns: 'auto auto auto', gridGap: "4px" }}>
          {numericKeys.map((numericKey) => (
            <Button
              key={numericKey}
              palette="secondary"
              onClick={() => onKeyClick(numericKey, 'numeric')}
            >
              {numericKey}
            </Button>
          ))}
        </Grid>
        <Grid display="flex" gap="4px">
          {lastRowKeys.map((lastRowKey) => (
            <Button
              size={lastRowKey.size}
              key={lastRowKey.label}
              palette="secondary"
              onClick={() =>
                onKeyClick(lastRowKey.value, lastRowKey.type)
              }
            >
              {lastRowKey.label}
            </Button>
          ))}
        </Grid>
      </Grid>
      <Grid gap="4px" display="flex" flexDirection="column">
        {operatorKeys.map((operatorKey) => (
          <Button
            key={operatorKey.label}
            onClick={() => onKeyClick(operatorKey.value, 'operator')}
          >
            {operatorKey.label}
          </Button>
        ))}
      </Grid>
    </Grid>
  );
};
