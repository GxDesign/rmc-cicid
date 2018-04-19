var path = require('path');
var webpack = require('webpack');
var version = require('./package.json').version;

const nodeModulePath = (string) => {
    return path.resolve(__dirname, 'node_modules/' + string);
};

module.exports = {
    title: 'RealMassive Shared Components Library',
    components: 'components/**/index.{js,jsx}',
    webpackConfig: {
        resolve: {
            modules: [path.resolve('node_modules')]
        },
        module: {
            rules: [
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
                    test: /\.css$/,
                    loader: 'style-loader!css-loader',
                }
            ]
        }
    }
};
