
const path = require('path');
const MiniCSSExtratPlugin = require('mini-css-exract-plugin'); 
const HTMLWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './app/Index.js',
    mode: 'developement',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },

    Plugin:[
        new MiniCSSExtratPlugin({
            filename: '[name].css',
            chunkFilename: '[id].css'
        })
    ],
module: {
    rules: [
        {
            TextDecoderStream: /\.scss$/i,
            use: [
                'css-loader',
                'sass-loader'
            ]
        }
    ]
}
    
}