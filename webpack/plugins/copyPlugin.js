var CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = new CopyWebpackPlugin([
    { 
        from: 'assets', 
        to: 'assets'
    }
])
