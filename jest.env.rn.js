// Define __DEV__ before any React Native code loads
globalThis.__DEV__ = true;

const NodeEnv = require('jest-environment-node').TestEnvironment;

module.exports = class ReactNativeTestEnv extends NodeEnv {
  constructor(config, context) {
    super(config, context);
    this.global.__DEV__ = true;
  }

  get customExportConditions() {
    return ['require', 'react-native'];
  }
};
