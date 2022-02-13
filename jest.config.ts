/*
 * For a detailed explanation regarding each configuration property and type check, visit:
 * https://jestjs.io/docs/configuration
 */

export default {
  // The glob patterns Jest uses to detect test files
  testMatch: [
    "**/?(*.)+(spec).[tj]s?(x)"
  ],
  moduleFileExtensions: ["js", "ts"],
  moduleDirectories: ["node_modules", "src"],
  transform: {
    '^.+\\.(ts)?$': 'ts-jest',
  },
};
