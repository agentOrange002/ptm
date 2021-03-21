const paths = require('./paths');
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const WebpackObfuscator = require('webpack-obfuscator');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
//const TerserPlugin = require("terser-webpack-plugin");
//const CompressionPlugin = require("compression-webpack-plugin");
//const zlib = require("zlib");

module.exports = merge(common, {
  mode: 'production',
  devtool: false,
  output: {
    path: paths.build,
    publicPath: '/',
    filename: 'js/[name].[contenthash].bundle.js',
  },
  plugins: [
    // Extracts CSS into separate files
    // Note: style-loader is for development, MiniCssExtractPlugin is for production
    new MiniCssExtractPlugin({
      filename: 'styles/[name].[contenthash].css',
      chunkFilename: '[id].css',
    }),
    
    // new CompressionPlugin({
    //   filename: "[path][base].gz",
    //   algorithm: "gzip",
    //   test: /\.js$|\.css$|\.html$/,
    //   threshold: 10240,
    //   minRatio: 0.8,
    // }),
    // new CompressionPlugin({
    //   filename: "[path][base].br",
    //   algorithm: "brotliCompress",
    //   test: /\.(js|css|html|svg)$/,
    //   compressionOptions: {
    //     params: {
    //       [zlib.constants.BROTLI_PARAM_QUALITY]: 11,
    //     },
    //   },
    //   threshold: 10240,
    //   minRatio: 0.8,
    // }),

    new WebpackObfuscator ({
      rotateStringArray: true
  }, ['[name].bundle.js']),   
  
  
  ],
  module: {
    rules: [
      {
        test: /\.(scss|css)$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2,
              sourceMap: false,
            },
          },
          'postcss-loader',
          'sass-loader',
        ],
        
      },
       //Obfuscator
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        enforce: 'post',
        use: { 
            loader: WebpackObfuscator.loader, 
            options: {
                rotateStringArray: true
            }
        }
      },
      
    ],
  },
  optimization: {

    minimize: true,
    minimizer: [new CssMinimizerPlugin(), "..."],   
    // minimizer: [
    // 	new CssMinimizerPlugin(), 
    //   new TerserPlugin({
    //     terserOptions: {
    //       ecma: undefined,
    //       parse: {},
    //       compress: {},
    //       mangle: true, // Note `mangle.properties` is `false` by default.
    //       module: false,
    //     },
    //      extractComments: false,
          
    //   }),
    // ],
    
    // Once your build outputs multiple chunks, this option will ensure they share the webpack runtime
    // instead of having their own. This also helps with long-term caching, since the chunks will only
    // change when actual code changes, not the webpack runtime.
    runtimeChunk: {
      name: 'runtime',
    },
    // Code Splitting Chunks - enhance optimization
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          // cacheGroupKey here is `commons` as the key of the cacheGroup
          name(module, chunks, cacheGroupKey) {
            const moduleFileName = module
              .identifier()
              .split('/')
              .reduceRight((item) => item);
            const allChunksNames = chunks.map((item) => item.name).join('~');
            return `${cacheGroupKey}-${allChunksNames}-${moduleFileName}`;
          },
          chunks: 'all',
        },
      },
    },
  },
  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000,   
  },
})
