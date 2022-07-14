module.exports = function receptorBabelPreset() {
  return {
    plugins: [
      [
        'effector/babel-plugin',
        { factories: ['effector-receptor'], noDefaults: true },
        'effector-receptor',
      ],
    ],
  };
};
