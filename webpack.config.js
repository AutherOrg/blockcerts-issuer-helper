const path = require('path')

module.exports = {
  entry: [
    './src/index.js'
  ],
  externals: [
    'ajv',
    'crypto-js',
    'isomorphic-fetch',
    'jsonld',
    'merkletreejs',
    'uuid'
  ],
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env'
            ],
            plugins: [
              ['@babel/transform-runtime']
            ]
          }
        }
      }
    ]
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'blockcerts-issuer-helper.js',
    library: 'blockcertsIssuerHelper',
    libraryExport: 'default',
    libraryTarget: 'umd',
    umdNamedDefine: true,
    globalObject: 'this'
  }
}
