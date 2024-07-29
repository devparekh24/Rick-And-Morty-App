export default {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
    "^.+\\.(css|scss|sass|less)$": "jest-preview/transforms/css",
    "^(?!.*\\.(js|jsx|mjs|cjs|ts|tsx|css|json)$)": "jest-preview/transforms/file",
  },
  moduleNameMapper: {
    '\\.(gif|ttf|eot|svg|png)$': '<rootDir>/test/__mocks__/fileMock.js',
    '^.+\\.module\\.(css|sass|scss)$': 'identity-obj-proxy',
  },
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
};