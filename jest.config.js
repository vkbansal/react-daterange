module.exports = {
    setupFiles: ['<rootDir>/tests/.setup.js'],
    testMatch: ['**/?(*.)(spec|test).ts?(x)'],
    moduleFileExtensions: ['ts', 'tsx', 'js'],
    roots: ['<rootDir>/tests'],
    transform: {
        '^.+\\.tsx?$': '<rootDir>/node_modules/ts-jest/preprocessor.js'
    },
    snapshotSerializers: ['enzyme-to-json/serializer', 'jest-glamor-react/dist/serializer'],
    collectCoverageFrom: ['src/**/*.{ts,tsx}']
};
