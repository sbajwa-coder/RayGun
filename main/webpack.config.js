var path = require('path')
var webpack = require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin')

// Phaser webpack config
var phaserModule = path.join(__dirname, '/node_modules/phaser/')
var phaser = path.join(phaserModule, 'dist/phaser.min.js')

module.exports = {
    entry: {
        app: [
            path.resolve(__dirname, 'src/main.js')
        ],
        vendor: ['phaser']
    },
    output: {
        path: path.resolve(__dirname, 'dev'),
        filename: '[name].js' // app.bundle.js
    },
    plugins: [
        new HtmlWebpackPlugin({
            //filename: './index.html',
            template: './src/index.html',
            chunks: ['vendor', 'app'],
            chunksSortMode: 'manual',
            minify: {
                removeAttributeQuotes: false,
                collapseWhitespace: false,
                html5: false,
                minifyCSS: false,
                minifyJS: false,
                minifyURLs: false,
                removeComments: false,
                removeEmptyAttributes: false
            },
            hash: false
        })
    ]//,
    // module: {
    //     rules: [
    //         { test: /\.js$/, use: ['babel-loader'], include: path.join(__dirname, 'src') },
    //         { test: /phaser-split\.js$/, use: ['expose-loader?Phaser'] },
    //         { test: [/\.vert$/, /\.frag$/], use: 'raw-loader' }
    //     ]
    // },
   /* node: {
        fs: 'empty',
        net: 'empty',
        tls: 'empty'
    },
    resolve: {
        alias: {
            'phaser': phaser,
        }
    }*/
}