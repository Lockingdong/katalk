var path = require("path");
var ExtractTextPlugin = require('extract-text-webpack-plugin');



// Create multiple instances
// var extractCSS = new ExtractTextPlugin('css/[name].css');


//path.resolve() ==> 組合路徑;
//__dirname ==> 當前資料夾


var devServer = require('./webpack/devServer');
var plugins = require('./webpack/plugins');

module.exports = {
    
    mode: process.env.NODE_ENV,
    context: path.resolve(__dirname, "./src"), //entry目錄
    entry: {
        index: 'index', //簡化路徑
    },
    output: {
        path: path.resolve(__dirname, "./public"),
        filename: './js/[name].js'
    },
    optimization: { //優化
        splitChunks: {
            cacheGroups: {
                vendor: {
                    test: /node_modules/,
                    name: 'vendor',
                    chunks: 'initial',
                    enforce: true
                }
            }
        }
    },
    resolve: {
        modules: [  //只適合在js 其他檔案要用~
            path.resolve('src'),
            path.resolve('src/js'),
            path.resolve('src/sass'),
            path.resolve('src/images'),
            path.resolve('node_modules')
        ],
        extensions: ['.js'],
        alias: { vue: 'vue/dist/vue.esm.js' }
    },
    devServer,
    module: {
        rules: [
            {
                test: /\.pug$/,
                use: [
                    'html-loader',
                    {
                        loader: 'pug-html-loader',
                        options: {
                        pretty: true,
                        },
                    },
                ],
                include: path.resolve('src/pug'),
                exclude: path.resolve('./node_modules'),
            },
            {
                test: /\.html$/,
                use: [{
                    loader: "file-loader", //什麼檔案都可以搬移
                    options: {
                        name: '[path][name].[ext]'
                    }
                }],
                include: path.resolve('src'),
                exclude: path.resolve('./node_modules'),
            },
            {
                test: /\.(woff|woff2|ttf|eot)$/,
                loader: 'file-loader',
                options: {
                    name: '[path][name].[ext]?[hash:8]'
                }
            },
            {
                test: /\.css$/, //讀取副副檔名
                use: ExtractTextPlugin.extract([
                    'css-loader',
                    'postcss-loader'
                ]) //'style-loader' 要注入js時使用
            },
            {
                test: /\.(sass|scss)$/,
                // use: [
                //     'style-loader',
                //     'css-loader',
                //     'postcss-loader',
                //     'sass-loader'
                // ] //要注入js時使用
                use: ExtractTextPlugin.extract({
                    // fallback: 'style-loader',
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                url: false,
                                sourceMap: true
                            }
                        },
                        {
                            loader: 'postcss-loader'
                        },
                        {
                            loader: 'sass-loader',
                            options: {
                                sourceMap: true
                            }
                        }
                    ]
                }),
                include: path.resolve('src/sass'),
                exclude: path.resolve('./node_modules'),
            },
            {
                test: /\.(js)$/,
                use: 'babel-loader',
                include: path.resolve('.'),
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/,
                include: path.resolve('src/images'),
                exclude: path.resolve('./node_modules'),
                use:[
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 1,
                            //name:'[path][name].[ext]?[hash:8]',
                            name: '[path][name].[ext]'
                            // outputPath: '../'
                        }
                    },
                    {
                        loader: 'image-webpack-loader',
                        options: {
                            mozjpeg: {
                                progressive: true,
                                quality: 65
                            },
                            optipng: {
                                enabled: false,
                            },
                            pngquant: {
                                quality: '65-90',
                                speed: 4
                            },
                            gifsicle: {
                                interlaced: false,
                            }
                        }
                    }
                ]
            }
        ]
    },
    plugins
}