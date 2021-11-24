module.exports = {
  extends: ['react-tools', 'plugin:import/errors', 'plugin:import/warnings', 'plugin:jest/recommended', 'prettier'],
  plugins: ['jest', 'import', 'babel'],
  env: {
    'jest/globals': true,
  },
}
