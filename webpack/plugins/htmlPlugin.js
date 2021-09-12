HtmlWebpackPlugin = require('html-webpack-plugin');

var htmlDatas = [
    {
        title: 'pug轉換',
        filename: 'main.html',
        template: 'pug/index.pug',
        chunks: ['vendor', 'index']
    },
];

module.exports = htmlDatas.map(obj => {
    return new HtmlWebpackPlugin(obj)
})