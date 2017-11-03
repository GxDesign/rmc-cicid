var path = require('path');
var webpack = require('webpack');
var version = require('./package.json').version;

const nodeModulePath = (string) => {
    return path.resolve(__dirname, 'node_modules/' + string);
};

module.exports = {
    bail: false,
    resolve: {
        modules: [
            path.resolve(__dirname, 'src'),
            path.resolve(__dirname, 'node_modules')
        ],
        extensions: ['.js', '.jsx'],
        alias: {
            // For superagent-no-cache
            'ie': 'component-ie'
        }
    },
    devtool: 'inline-source-map',
    module: {
        rules: [{
            test: /\.jsx?$/,
            use: [{
                loader: 'babel-loader',
                options: {
                    presets: [
                        nodeModulePath('babel-preset-react'),
                        [nodeModulePath('babel-preset-es2015'), {
                            modules: false
                        }],
                        nodeModulePath('babel-preset-stage-0')
                    ],
                    plugins: [
                        nodeModulePath('babel-plugin-transform-decorators-legacy'),
                        nodeModulePath('babel-plugin-react-css-modules')
                    ]
                }
            }],
            exclude: /node_modules/
        }, {
            test: /\.(css|scss)$/,
            use: [{
                loader: 'style-loader'
            }, {
                loader: 'css-loader',
                options: {
                    sourceMap: true,
                    modules: true,
                    importLoaders: 1,
                    localIdentName: '[path]___[name]__[local]___[hash:base64:5]'
                }
            }, {
                loader: 'sass-loader',
                options: {
                    sourceMap: true
                }
            }]
        }]
    }
};
