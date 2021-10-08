const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const mf = require('@angular-architects/module-federation/webpack');
const path = require('path');

const sharedMappings = new mf.SharedMappings();
sharedMappings.register(path.join(__dirname, '../../tsconfig.base.json'), [
  /* mapped paths to share */
  '@srm/shared/alert-dialog',
  '@srm/shared/loading-spinner',
  '@srm/data-grid/api-service',
  '@srm/data-grid/grid-contents',
]);

module.exports = {
  output: {
    uniqueName: 'data-grid',
    publicPath: 'auto',
  },
  optimization: {
    runtimeChunk: false,
    minimize: false,
  },
  resolve: {
    alias: {
      ...sharedMappings.getAliases(),
    },
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'data_grid',
      filename: 'remoteEntry.js',
      exposes: {
        './Module': 'apps/data-grid/src/app/remote-entry/entry.module.ts',
      },
      shared: {
        '@angular/core': {
          singleton: true,
          requiredVersion: '^12.2.0',
          strictVersion: true,
        },
        '@angular/common': {
          singleton: true,
          requiredVersion: '^12.2.0',
          strictVersion: true,
        },
        '@angular/common/http': {
          singleton: true,
          requiredVersion: '^12.2.0',
          strictVersion: true,
        },
        '@angular/router': {
          singleton: true,
          requiredVersion: '^12.2.0',
          strictVersion: true,
        },
        ...sharedMappings.getDescriptors(),
      },
    }),
    sharedMappings.getPlugin(),
  ],
};
