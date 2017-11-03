const webpack = require('webpack');
const path = require('path');
const Extract = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const MinifyPlugin = require("babel-minify-webpack-plugin");

const PROD = process.env.NODE_ENV === 'production';
const DEV = !PROD;

const config = {
    context: __dirname,
    entry: ['./index.tsx'],
    output: {
        filename: DEV ? 'bundle.js' : 'bundle.[hash].js',
        path: path.resolve(__dirname, '../public'),
        publicPath: DEV ? '/' : '/react-daterange/',
        hashDigestLength: 6,
        sourceMapFilename: 'bundle.js.map'
    },
    resolve: {
        modules: [path.resolve(__dirname, '../src'), 'node_modules']
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: [
                    {
                        loader: 'ts-loader',
                        options: {
                            compilerOptions: {
                                declaration: false
                            }
                        }
                    }
                ],
                include: [path.resolve(__dirname, '../src'), path.resolve(__dirname)]
            },
            {
                test: /\.css$/,
                use: Extract.extract({
                    fallback: 'style-loader',
                    use: [
                        {
                            loader: 'css-loader'
                        }
                    ]
                })
            }
        ]
    },
    plugins: [
        new Extract({
            filename: DEV ? 'styles.css' : 'styles.[contenthash:6].css',
            allChunks: true
        }),
        new HtmlWebpackPlugin({
            template: 'index.html',
            inject: true,
            filename: 'index.html'
        })
    ],
    resolve: {
        extensions: ['.ts', '.tsx', '.js']
    }
};

!PROD && (config.devtool = 'source-map');

PROD &&
    config.plugins.push(
        new webpack.optimize.UglifyJsPlugin({
            compressor: {
                warnings: false
            }
        })
    );

PROD &&
    config.plugins.push(
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production')
            }
        })
        // new MinifyPlugin()
    );

module.exports = config;
