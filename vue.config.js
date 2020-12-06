const path = require('path')
const resolve = dir => path.join(__dirname, dir)


module.exports = {
    publicPath: './',
    outputDir: 'dist',

    chainWebpack: config => {
        config.resolve.alias
            .set('@', resolve('src'))
            .set('assets', resolve('src/assets'))
            .set('commons', resolve('src/commons'))
            .set('components', resolve('src/components'))
            .set('views', resolve('src/views'))
            .set('plugins', resolve('src/plugins'))
            .set('common', resolve('src/components/common'))
            .set('content', resolve('src/components/content'))
    }
}