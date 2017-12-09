module.exports = {
    setupFiles: ['<rootDir>/src/__tests__/.setup.js'],
    testMatch: ['**/?(*.)(spec|test).ts?(x)'],
    moduleFileExtensions: ['ts', 'tsx', 'js'],
    roots: ['<rootDir>/src/__tests__/'],
    transform: {
        '^.+\\.tsx?$': '<rootDir>/node_modules/ts-jest/preprocessor.js'
    },
    snapshotSerializers: ['enzyme-to-json/serializer', 'jest-glamor-react/dist/serializer'],
    collectCoverageFrom: ['src/*.{ts,tsx}']
};
