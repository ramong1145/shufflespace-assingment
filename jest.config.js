module.exports = {
    clearMocks: true,
    coverageDirectory: 'coverage',
    coveragePathIgnorePatterns: [
        '/node_modules/',
    ],
    rootDir: '/',
    testMatch: [
      "**/__tests__/**/*.[jt]s?(x)",
      "**/?(*.)+(spec|test).[tj]s?(x)"
    ]
};