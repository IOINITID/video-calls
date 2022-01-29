import path from 'path';
import webpack from 'webpack';
import webpackDevServer from 'webpack-dev-server';
import htmlWebpackPlugin from 'html-webpack-plugin';

const configuration: webpack.Configuration & { devServer?: webpackDevServer.Configuration } = {
  mode: 'production',
  entry: './src/index.tsx',
  output: {
    filename: 'scripts/[name].[contenthash].js',
    path: path.join(__dirname, 'dist'),
    clean: true,
    // publicPath: '/', // TODO: включать только для режима разработки через env переменную
  },
  devServer: {
    hot: true, // TODO: Добавить HMR для React
    port: 3000,
    historyApiFallback: true,
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'esbuild-loader',
          options: {
            loader: 'tsx',
            target: 'es2015',
          },
        },
      },
      {
        test: /\icon.svg$/,
        use: {
          loader: '@svgr/webpack',
        },
      },
      {
        test: /\image.(jpe?g|png|wepb|gif|avif|svg)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: 'assets/images/[name].[contenthash].[ext]',
          },
        },
      },
      {
        test: /\.(woff2?|ttf)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: 'assets/fonts/[name].[contenthash].[ext]',
          },
        },
      },
      {
        test: /\.mp3$/,
        use: {
          loader: 'file-loader',
          options: {
            name: 'assets/sounds/[name].[contenthash].[ext]',
          },
        },
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
  },
  plugins: [
    new htmlWebpackPlugin({
      inject: 'body',
      scriptLoading: 'blocking',
      template: path.join(__dirname, 'src', 'index.html'),
    }),
    new webpack.ProvidePlugin({
      React: 'react',
    }),
  ],
  devtool: 'source-map',
};

export default configuration;
