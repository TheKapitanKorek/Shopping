const presets = [
    [
      "@babel/env",
      {
        targets: "> 1%, not dead",
        useBuiltIns: "usage",
        corejs: 3
      }
    ]
  ];
  module.exports = { presets };