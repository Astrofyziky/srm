const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const mf = require('@angular-architects/module-federation/webpack');
const path = require('path');

const sharedMappings = new mf.SharedMappings();
sharedMappings.register(path.join(__dirname, '../../tsconfig.base.json'), [
  /* mapped paths to share */
]);

module.exports = {
  output: {
    uniqueName: 'dashboard-shell',
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
      remotes: {
        'data-grid': 'data_grid@http://localhost:4201/remoteEntry.js',
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
