const nodeExternals = require('webpack-node-externals');
const path = require('path');
const webpack = require('webpack');
const version = require('./package.json').version;

const nodeModulePath = (string) => {
    return path.resolve(__dirname, 'node_modules/' + string);
};

module.exports = {
    title: 'RealMassive Shared Components Library',
    components: path.resolve(__dirname, 'components/**/src/**/*.{js,jsx}'),
    ignore: [
        '**/_*.js',
        '**/__tests__/**',
        '**/*.test.{js,jsx,ts,tsx}',
        '**/*.spec.{js,jsx,ts,tsx}',
        '**/*.d.ts',
        '**/node_modules/**'
    ],
    webpackConfig: {
        resolve: {
            modules: [path.resolve('node_modules')]
        },
        externals: [nodeExternals()],
        node: {
            module: false,
            fs: 'empty',
            child_process: 'empty',
            'node-pre-gyp': 'empty'
        },
        module: {
            rules: [
                {
                    enforce: 'pre',
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'eslint-loader',
                        options: {
                            configFile: path.resolve(__dirname, '.eslintrc')
                        }
                    }
                },
                {
                    test: /\.jsx?$/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: [
                                nodeModulePath('babel-preset-es2015'),
                                nodeModulePath('babel-preset-react'),
                                nodeModulePath('babel-preset-stage-0')
                            ]
                        }
                    }
                },
                {
                    test: /\.(png|jpg|gif)$/,
                    use: [
                        {
                            loader: 'file-loader',
                            options: {}
                        }
                    ]
                }
            ]
        }
    }
};
