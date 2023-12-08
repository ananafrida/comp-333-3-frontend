/*This file deals with css and static assets that cannot be loaded through jest, as well as modules which aren't already read by jest..*/

module.exports = {
  moduleNameMapper: {
    "\\.(scss|sass|css)$": "identity-obj-proxy",
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
      "<rootDir>/__mocks__/fileMock.js",
    "\\.(css|less)$": "<rootDir>/__mocks__/styleMock.js",
  },
  //This snippet adapted from: https://dev.to/steveruizok/jest-and-esm-cannot-use-import-statement-outside-a-module-4mmj
  transformIgnorePatterns: ["node_modules/(?!(axios)/)"],
  transform: {
    "^.+\\.(js|jsx|ts|tsx|mjs)$": "babel-jest",
  },
};
