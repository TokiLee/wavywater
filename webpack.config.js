const path = require('path');

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test: /\.(png|svg|jpe?g|gif)$/,
                loader: 'file-loader', 
                options: {
                    name: '[name].[ext]?[hash:7]' 
                } 
            }            
        ]
    }
};