import { azureResourcesPlugin } from './plugin';

describe('azure-resources', () => {
  it('should export plugin', () => {
    expect(azureResourcesPlugin).toBeDefined();
  });
});
