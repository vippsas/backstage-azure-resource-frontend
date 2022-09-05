import { createDevApp } from '@backstage/dev-utils';
import { azureResourcesPlugin } from '../src/plugin';

createDevApp()
  .registerPlugin(azureResourcesPlugin)
  .render();