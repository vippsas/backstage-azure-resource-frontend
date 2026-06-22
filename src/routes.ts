import { createRouteRef } from '@backstage/core-plugin-api';

export const rootRouteRef = createRouteRef({
  id: 'azure-resources',
});

export const cardPspRouteRef = createRouteRef({
  id: 'card-psp',
});
