// ajax发送之前会经过这里
$.ajaxPrefilter(function(options) {
    options.url = 'http://www.liulongbin.top:3008' + options.url;
    // console.log(options.url);
    // 设置权限接口
    if (options.url.indexOf('/my/') !== -1) {
        options.headers = {
            Authorization: localStorage.getItem('token') || ''
        };
    }
    options.complete = function(response) {
        console.log(response);
        if (response.responseJSON.code === 1 && res.responseJSON.message === '身份认证失败！') {
            //   清token
            localStorage.removeItem('token');
            // 跳页面
            location.href = '/login.html';
        }
    };
});