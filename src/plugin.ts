import { createPlugin, createRoutableExtension } from '@backstage/core-plugin-api';
import { rootRouteRef } from './routes';

export const azureResourcesPlugin = createPlugin({
  id: 'azure-resources',
  routes: {
    root: rootRouteRef,
  },
});

export const AzureResourceEntityOverviewCard = azureResourcesPlugin.provide(
  createRoutableExtension({
    name: 'Azure overview',
    component: () =>
      import('./components/EntityAzureResourceCard').then(m => m.EntityAzureResourceOverviewCard),
    mountPoint: rootRouteRef,
  }),
);

export const EntityAzureSecurityOverviewCard = azureResourcesPlugin.provide(
  createRoutableExtension({
    name: 'Security recommendations',
    component: () =>
      import('./components/EntityAzureResourceSecurityCard').then(m => m.EntityAzureSecurityCard),
    mountPoint: rootRouteRef,
  }),
);