module.exports = {
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.cjs"],
  transform: {
    "^.+\\.[jt]sx?$": "babel-jest",
  },
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
    "\\.(css|module\\.css)$": "identity-obj-proxy",
    "\\.(png|jpg|svg)$": "<rootDir>/src/__mocks__/fileMock.js",
  },
}