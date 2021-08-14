$(function() {
    // 获取用户信息
    getUserInfo();
    //   退出
    var layer = layui.layer;
    $('#logout').on('click', function() {
        layer.confirm('确认退出嘛2', { icon: 5, title: '提示' }, function(index) {
            //do something
            //   清token
            localStorage.removeItem('token');
            // 跳页面
            location.href = '/login.html';
            layer.close(index);
        });
    });
});

/**
 * 获取用户数据
 */
function getUserInfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        //  请求头
        // headers: {
        //   Authorization: localStorage.getItem('token'),
        // },
        success: function(response) {
            //  console.log(response);
            if (response.code !== 0) {
                return layui.layer.msg('获取用户数据失败！');
            }
            // 渲染用户信息
            renderAvatar(response.data);
        },
        // // 最终执行
        // complete: function (response) {
        //   console.log(response);
        //   if (response.responseJSON.code === 1) {
        //     //   清token
        //     localStorage.removeItem('token');
        //     // 跳页面
        //     location.href = '/login.html';
        //   }
        // },
    });
}

//  渲染用户信息
function renderAvatar(params) {
    console.log(params);
    // 获取用户名称
    var name = params.nichname || params.username;
    //   设置用户名
    $('#welcome').html('欢迎&nbsp;&nbsp;' + name);
    if (params.user_pic !== null) {
        //   渲染图片头像
        $('.layui-nav-img').attr('src', params.user_pic).show();
        $('.text-avatar').hide();
    } else {
        //   渲染文本头像
        $('.layui-nav-img').hide();
        var letter = name[0].toUpperCase();
        $('.text-avatar').html(letter).show();
    }
}