"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var path_1 = __importDefault(require("path"));
var html_webpack_plugin_1 = __importDefault(require("html-webpack-plugin"));
var configuration = {
    mode: 'production',
    entry: './src/index.tsx',
    output: {
        filename: 'scripts/[name].[contenthash].js',
        path: path_1["default"].join(__dirname, 'dist'),
        clean: true,
        publicPath: '/'
    },
    devServer: {
        hot: true,
        port: 3000,
        historyApiFallback: true
    },
    optimization: {
        splitChunks: {
            chunks: 'all'
        }
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                exclude: /node_modules/,
                use: {
                    loader: 'ts-loader'
                }
            },
            {
                test: /\icon.svg$/,
                use: {
                    loader: '@svgr/webpack'
                }
            },
            {
                test: /\image.(jpe?g|png|wepb|gif|avif|svg)$/,
                use: {
                    loader: 'file-loader',
                    options: {
                        name: 'assets/images/[name].[contenthash].[ext]'
                    }
                }
            },
            {
                test: /\.(woff2?|ttf)$/,
                use: {
                    loader: 'file-loader',
                    options: {
                        name: 'assets/fonts/[name].[contenthash].[ext]'
                    }
                }
            },
            {
                test: /\.mp3$/,
                use: {
                    loader: 'file-loader',
                    options: {
                        name: 'assets/sounds/[name].[contenthash].[ext]'
                    }
                }
            },
        ]
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx']
    },
    plugins: [
        new html_webpack_plugin_1["default"]({
            inject: true,
            scriptLoading: 'blocking',
            template: path_1["default"].join(__dirname, 'src', 'index.html')
        }),
    ],
    devtool: 'source-map'
};
exports["default"] = configuration;
