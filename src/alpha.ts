import { createFrontendPlugin } from '@backstage/frontend-plugin-api';
import { entityAzureContent } from './extensions/entityCards';

/** @alpha */
export default createFrontendPlugin({
  pluginId: 'azure-resources',
  extensions: [entityAzureContent],
});
