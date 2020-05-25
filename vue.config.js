module.exports = {
    devServer: {
        open: true,
        host: "localhost",//这里应该写您前端部署的真实IP地址或者域名
        port: 8080,
        https: false,
        //以上的ip和端口是我们本机的;下面为需要跨域的
        proxy: {
            //配置跨域
            "/api": {
                target: "http://localhost:6666", //这里后台的地址模拟的;应该填写你们真实的后台接口
                // uat网关
                //target: "http://gateway.uat.chinare.com.cn",
                // 生产网关
                //target: "http://gateway.crudp.chinare.com.cn",
                ws: true,
                changOrigin: true, //允许跨域
                pathRewrite: {
                    "^/api": "" //请求的时候使用这个api就可以
                }
            },
            "/auth_center": {
                target: "http://localhost:2222",
                // uat 统一认证
                //target: "http://cas.uat.chinare.com.cn:2222",
                // 生产 统一认证
                //target: "http://cas.crudp.chinare.com.cn",
                ws: true,
                changOrigin: true,
                pathRewrite: {
                    "^/auth_center": ""
                }
            },
//
//
//这里的配置为了在上传文件时绕过网关的servletFilter对于文件大小的限制，您在前端上传文件时，应当使用这个api
//
//
             "/zuul": {
                target: "http://123.57.80.168:8081",
                // uat网关
                //target: "http://gateway.uat.chinare.com.cn",
                // 生产网关
                //target: "http://gateway.crudp.chinare.com.cn",
                ws: true,
                changOrigin: true,
                pathRewrite: {
                    "^/zuul": "/zuul/opension2_server"
                }
            },
            "/mock": {
                target: "https://easy-mock.com/mock/5c0a18013c098813c612cdcc", //这里后台的地址模拟的;应该填写你们真实的后台接口
                ws: true,
                changOrigin: true, //允许跨域
                pathRewrite: {
                    "^/mock": "" //请求的时候使用这个api就可以
                }
            }
        }
        //以下本地调试时，如果你不想使用网关
        // proxy: {
        //     //配置跨域
        //     "/api": {
        //         target: "http://localhost:9999", //这里后台的地址模拟的;应该填写你们真实的后台接口
        //         ws: true,
        //         changOrigin: true, //允许跨域
        //         pathRewrite: {
        //             "^/api": "" //请求的时候使用这个api就可以
        //         }
        //     },
        //     "/auth_center": {
        //         target: "http://cas.sit.chinare.com.cn:2222",
        //         ws: true,
        //         changOrigin: true,
        //         pathRewrite: {
        //             "^/auth_center": ""
        //         }
        //     },
        //     "/mock": {
        //         target: "https://easy-mock.com/mock/5c0a18013c098813c612cdcc", //这里后台的地址模拟的;应该填写你们真实的后台接口
        //         ws: true,
        //         changOrigin: true, //允许跨域
        //         pathRewrite: {
        //             "^/mock": "" //请求的时候使用这个api就可以
        //         }
        //     }
        // }
    }
}
;
