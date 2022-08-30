import React from 'react';
import { createDevApp } from '@backstage/dev-utils';
import { azureResourcesPlugin, AzureResourcesPage } from '../src/plugin';

createDevApp()
  .registerPlugin(azureResourcesPlugin)
  .addPage({
    element: <AzureResourcesPage />,
    title: 'Root Page',
    path: '/azure-resources'
  })
  .render();
