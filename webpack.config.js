const { resolve, join } = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

let ENV = process.env.npm_lifecycle_event;

module.exports = function() {
    const config = {};
    const isBuildEnv = ENV.indexOf('build') > -1;

    config.entry = [];

    if(!isBuildEnv) {
        config.entry.push(
            'react-hot-loader/patch',
            'webpack-dev-server/client?http://localhost:8080',
            'webpack/hot/only-dev-server'
        );
    }

    config.entry.push(
        './app/index.js'
    );

    config.output = {
        filename: isBuildEnv ? '[name]-[hash].js' : '[name].bundle.js',
        path: resolve(__dirname, 'docs'),
        publicPath: isBuildEnv ? '' : 'http://localhost:8080/'
    };

    config.devtool = isBuildEnv ? (ENV === 'build' ? false : 'source-map') : 'eval-source-map';

    if(!isBuildEnv) {
        config.devServer = {
            hot: true,
            contentBase: resolve(__dirname, 'docs'),
            publicPath: '/'
        };
    }

    config.resolve = {
        alias: {
            '@images': resolve(__dirname, 'assets/images')
        }
    };

    config.module = {
        rules: [
            {
                test: /\.js$/,
                use: ['babel-loader'],
                exclude: /node_modules/
            },
            {
                test:   /\.(png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot|ico|otf)$/,
                use: ['file-loader']
            },
            {
                test: /\.html$/,
                use: ['html-loader']
            },
            {
                test: /\.(scss|css)$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', 'sass-loader']
                })
            },
        ],
    };

    config.plugins = [];

    config.plugins.push(
        new HtmlWebpackPlugin({
            template: __dirname + '/app/index.html',
            inject: true
        }),
        new ExtractTextPlugin({filename: '[name]-[hash].css', disable: !isBuildEnv}),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin(),
        new webpack.DefinePlugin({
            BUILD: JSON.stringify(ENV),
            'process.env.NODE_ENV': isBuildEnv ? "'production'" : "'development'"
        })
    );

    if(isBuildEnv) {
        config.plugins.push(
            new webpack.NoEmitOnErrorsPlugin(),
            new webpack.optimize.UglifyJsPlugin({
                sourceMap: ENV !== 'build',
                parallel: true
            })
        )
    }

    return config;
}();
