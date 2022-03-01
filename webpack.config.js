const path = require('path');

//public folder is automatically made by setting output prop in webpack.config.js
module.exports = {
    entry: './client/index.js',
    output: {
        path: path.join(__dirname, 'public'),
        filename:'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-react']
                }
            }
        ]
    }
}