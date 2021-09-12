var devServer = {
    compress: true,
    port: 8888,
    stats: {
        assets: true,
        cached: false,
        chunkModules: false,
        chunkOrigins: false,
        chunks: false,
        colors: true,
        hash: false,
        modules: false,
        reasons: false,
        source: false,
        version: false,
        warnings: false
    }
}

module.exports = devServer;