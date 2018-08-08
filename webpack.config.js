const path = require('path');

module.exports = {
    mode: 'development',
    devtool: "inline-source-map",
    entry: './src/football.ts',
    resolve: {
        extensions: [ '.tsx', '.ts', '.js' ]
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            }
        ]
    },
    output: {
        filename: 'football.js',
        path: path.resolve(__dirname, 'dist')
    }
};