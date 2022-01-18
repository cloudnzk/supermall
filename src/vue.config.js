module.exports = {
    //配置webpack
    configureWebpack: {
        resolve: {
            //配置别名
            alias: {
                'assets': '@/assets',
                'common': '@/common',
                'components': '@/components',
                'network': '@/network',
                'views': '@/views',
            }
        }
    }
}