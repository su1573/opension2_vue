export default {
    system: {
        name: "职业年金2",
        logo: "logo.png",
        loginLogo: "CR_logo.png"
    },
    /*http: {
        baseUrl: "http://127.0.0.1:8080",
        casUrl: "http://139.9.130.209:2222/login",
        casOutUrl: "http://139.9.130.209:2222/logout",
        casIndex: "http://139.9.130.209:2222/index",
        timeOut: 5000, // 超时时间
        login: "/api", // 用户登录
        home: "#/menu725",//这里写进入系统后展示的首页路径
        copyright: "Copyright © 2019 - 中科软集团. All Rights Reserved "
    }*/

    http: {
        baseUrl: "http://127.0.0.1:8080",
        casUrl: "http://127.0.0.1:2222/login",
        casOutUrl: "http://127.0.0.1:2222/logout",
        casIndex: "http://127.0.0.1:2222/index",
        timeOut: 5000, // 超时时间
        login: "/api", // 用户登录
        home: "#/menu725",//这里写进入系统后展示的首页路径
        copyright: "Copyright © 2019 - 中科软集团. All Rights Reserved "
    }
//
//
//下面的配置是uat环境使用的
//
//
    // http: {
    //     baseUrl: "http://127.0.0.1:8080",//这里应该写您前端部署的真实IP地址
    //     casUrl: "http://cas.uat.chinare.com.cn:2222/login",
    //     casOutUrl: "http://cas.uat.chinare.com.cn:2222/logout",
    //     casIndex: "http://cas.uat.chinare.com.cn:2222/index",
    //     timeOut: 5000, // 超时时间
    //     login: "/api", // 用户登录
    //     home: "#/menu725",//这里写进入系统后展示的首页路径
    //     copyright: "Copyright © 2019 - 人保集团. All Rights Reserved "
    // }

//
//
//下面的配置是生产环境使用的
//
//
    // http: {
    //     baseUrl: "http://127.0.0.1:8080",//这里应该写您前端部署的真实IP地址或者域名+端口
    //     casUrl: "http://cas.crudp.chinare.com.cn/login",
    //     casOutUrl: "http://cas.crudp.chinare.com.cn/logout",
    //     casIndex: "http://cas.crudp.chinare.com.cn/index",
    //     timeOut: 5000, // 超时时间
    //     login: "/api", // 用户登录
    //     home: "#/menu725",//这里写进入系统后展示的首页路径
    //     copyright: "Copyright © 2019 - 人保集团. All Rights Reserved "
    // }
}
