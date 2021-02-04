module.exports = {
  testEnvironment: 'node',
  coveragePathIgnorePatterns: [
    '/node_modules/',
    'src/index.js',
    'src/loaders/mongoose.js'
  ],
  verbose: true,
  collectCoverageFrom: ['src/**/*.js']
};
