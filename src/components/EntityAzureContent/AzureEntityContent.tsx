import React from 'react';
import { Grid } from '@material-ui/core';
import { GetEntityAzureResourceGroups } from '../EntityFetchAzureData/EntityFetchAzureData';
import { GetEntityAzureSecurityRecommendations } from '../EntityFetchAzureData/EntityFetchAzureSecurityData';
import { GetEntityAzureCostAdvice } from '../EntityFetchAzureData/EntityFetchAzureCostAdviceData';

export const AzureEntityContent = () => (
  <Grid container spacing={3}>
    <Grid item xs={12}>
      <GetEntityAzureResourceGroups />
    </Grid>
    <Grid item xs={12}>
      <GetEntityAzureSecurityRecommendations />
    </Grid>
    <Grid item xs={12}>
      <GetEntityAzureCostAdvice />
    </Grid>
  </Grid>
);
