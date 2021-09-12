var ExtractTextPlugin = require('extract-text-webpack-plugin');
// Create multiple instances
// var extractCSS = new ExtractTextPlugin('css/[name].css');

module.exports = new ExtractTextPlugin({
    filename: 'css/[name].css',
    allChunks: true
});