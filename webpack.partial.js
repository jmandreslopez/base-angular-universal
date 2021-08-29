const webpack = require('webpack');

module.exports = {

  plugins: [

    // Ignore moment locales
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)
    // new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /en|es|fr/),

  ],

}
