const path = require('path');
const PATH_TO_NODE_MODULES = path.resolve(__dirname, './node_modules/');
const PATH_TO_HH = path.resolve(__dirname, './js/HH');

const cfg = {
    entry: {
        init: './js/init.js',
        e: './js/e.js'
    },
    mode: 'development',
    output: {
        path: path.resolve(__dirname, 'lib'),
        filename: '[name].bundle.js',
    },
    module: {
        rules: [
            {
                test: /.js?$/,
                exclude: [PATH_TO_NODE_MODULES],
                use: {
                    loader: 'babel-loader',
                    options: {
                        plugins: ['syntax-dynamic-import'],
                        presets: [
                            [
                                'env',
                            ],
                        ],
                    },
                },
            },
        ],
    },
    resolve: {
        alias: {
            HH: PATH_TO_HH,
        },
        extensions: ['.js'],
    },
    resolveLoader: {
        modules: [PATH_TO_NODE_MODULES],
    },
    optimization: {
        splitChunks: {
            name: true,
            chunks: 'all',
            maxAsyncRequests: 20,
            maxInitialRequests: 20,
            minSize: 1,
            cacheGroups: {
                wtf: {
                    name: 'wtf',
                    chunks: 'async',
                    maxSize: 1,
                }
            },
        },
    },
};

module.exports = cfg;
