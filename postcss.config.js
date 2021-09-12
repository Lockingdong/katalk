module.exports = {
    plugins: [
        require('autoprefixer')({
            overrideBrowserslist: [ // 指定支援的瀏覽器版本
                '> 1%',
                'last 5 versions',
                'FireFox >= 45',
                'Safari >= 78',
                'ie >= 0',
                'iOS >= 8',
                'last 2 Edge versions',
            ],
        })
    ]
}