$(function() {
    // 字段校验
    var form = layui.form;
    var layer = layui.layer;
    form.verify({
        nickname: function(value) {
            if (value.length > 6) {
                return '昵称小于6个字符';
            }
        },
    });
    initUserInfo()
        //   获取用户基本资料
    function initUserInfo() {
        $.ajax({
            method: 'get',
            url: '/my/userinfo',
            success: function(res) {
                if (res.code !== 0) {
                    return layer.msg('获取用户资料失败！');
                }
                console.log(res); //成功
                // 表单赋值form.val()
                form.val('formUserInfo', res.data)
                    // console.log(form.val);

            },
        });
    }

    //   重置表单
    $('#reset').on('click', function(e) {
            e.preventDefault()
            initUserInfo()
        })
        // 更新表单
    $('.layui-form').on('submit', function(e) {
        // console.log(111212121212);
        e.preventDefault()
        $.ajax({
            method: "PUT",
            url: "/my/userinfo",
            data: $(this).serialize(),
            success: function(res) {
                if (res.code !== 0) {
                    return layer.msg('更改信息出差')
                }
                layer.msg('更改信息成功')
                    // 调用父页面的方法  rerender重新渲染数据
                window.parent.getUserInfo()
            }
        });
    })


});