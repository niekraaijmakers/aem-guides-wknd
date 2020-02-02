'use strict';

const path                    = require('path');
const paths = require('./paths');
const webpack                 = require('webpack');
const MiniCssExtractPlugin    = require("mini-css-extract-plugin");
const TSConfigPathsPlugin     = require('tsconfig-paths-webpack-plugin');
const TSLintPlugin            = require('tslint-webpack-plugin');
const CopyWebpackPlugin       = require('copy-webpack-plugin');
const { CleanWebpackPlugin }  = require('clean-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const SOURCE_ROOT = __dirname + '/src/main/webpack';

const publicPath = paths.clientLibRelativePath + '/';

module.exports = {
        resolve: {
            extensions: ['.js', '.ts'],
            plugins: [new TSConfigPathsPlugin({
                configFile: paths.tsConfig
            })]
        },
        entry: {
            site: paths.entryPoint
        },
        output: {
            path: paths.clientLibRoot,
            filename: 'js/[name].bundle.js',
            // There are also additional JS chunk files if you use code splitting.
            chunkFilename: 'js/[name].[hash:8].js',
            // This is the URL that app is served from. We use "/" in development.
            publicPath: publicPath,
        },
        optimization: {
            splitChunks: {
                chunks: 'async',
                minSize: 30000,
                minChunks: 1,
                maxAsyncRequests: 5,
                maxInitialRequests: 3,
                automaticNameDelimiter: '~',
                name: true,
                cacheGroups: {
                    vendors: {
                        test: /[\\/]node_modules[\\/]/,
                        priority: -10
                    },
                    default: {
                        minChunks: 2,
                        priority: -20,
                        reuseExistingChunk: true
                    }
                }
            },
            runtimeChunk: {
                name: 'bootstrap',
            },
        },
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    exclude: [
                        /(node_modules)/
                    ],
                    use: [
                        {
                            loader: "ts-loader"
                        },
                        {
                            loader: "webpack-import-glob-loader",
                            options: {
                                url: false
                            }
                        }
                    ]
                },
                {
                    test: /\.scss$/,
                    use: [
                        MiniCssExtractPlugin.loader,
                        {
                            loader: "css-loader",
                            options: {
                                url: false
                            }
                        },
                        {
                            loader: 'postcss-loader',
                            options: {
                                plugins() {
                                    return [
                                        require('autoprefixer')
                                    ];
                                }
                            }
                        },
                        {
                            loader: "sass-loader",
                            options: {
                                url: false
                            }
                        },
                        {
                            loader: "webpack-import-glob-loader",
                            options: {
                                url: false
                            }
                        }
                    ]
                },
                {
                    test: /\.(ico|jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2)(\?.*)?$/,
                    use: {
                      loader: 'file-loader',
                      options: {
                        name: '[path][name].[ext]'
                      }
                    }
                },
            ]
        },
        plugins: [
            new ManifestPlugin({
                fileName: 'asset-manifest.json'
            }),
            new CleanWebpackPlugin({
                cleanOnceBeforeBuildPatterns: ['**/*', '!*.xml']
            }),
            new webpack.NoEmitOnErrorsPlugin(),
            new MiniCssExtractPlugin({
                filename: 'css/[name].css',
                chunkFilename: 'css/[name].[hash:8].css',
            }),
            new TSLintPlugin({
                files: [SOURCE_ROOT + '/**/*.ts', SOURCE_ROOT + '/**/*.tsx'],
                config: './tslint.json'
            }),
            new CopyWebpackPlugin([
                { from: paths.sources + '/resources', to: paths.clientLibRoot + '/resources' }
            ])
        ],
        stats: {
            assetsSort: "chunks",
            builtAt: true,
            children: false,
            chunkGroups: true,
            chunkOrigins: true,
            colors: false,
            errors: true,
            errorDetails: true,
            env: true,
            modules: false,
            performance: true,
            providedExports: false,
            source: false,
            warnings: true
        }
};
