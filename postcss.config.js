/* eslint-disable import/no-extraneous-dependencies */
const postcssPresetEnv = require('postcss-preset-env');
const postcssWillChange = require('postcss-will-change');
const postcssFlexbugsFixes = require('postcss-flexbugs-fixes');
const postcssOpacity = require('postcss-opacity');
const postcssPseudoelements = require('postcss-pseudoelements');
const postcssVmin = require('postcss-vmin');
const postcssPixrem = require('pixrem');

module.exports = {
  plugins: [
    postcssPresetEnv({
      autoprefixer: { grid: true },
    }),
    postcssWillChange(),
    postcssFlexbugsFixes(),
    postcssOpacity(),
    postcssPseudoelements(),
    postcssVmin(),
    postcssPixrem(),
  ],
};
