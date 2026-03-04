import React from 'react';
import { EntityContentBlueprint } from '@backstage/plugin-catalog-react/alpha';
import { isAzureResourceEnabled } from '../components/entityData';

/** @alpha */
export const entityAzureContent = EntityContentBlueprint.make({
  name: 'azure',
  params: {
    path: '/azure',
    title: 'Azure',
    filter: isAzureResourceEnabled,
    loader: () =>
      import('../components/EntityAzureContent/AzureEntityContent').then(m => (
        <m.AzureEntityContent />
      )),
  },
});
