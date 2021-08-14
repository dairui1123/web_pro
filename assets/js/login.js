$(function() {
    // 点击切换
    $('#link_reg').on('click', function() {
        $('.login-box').hide();
        $('.reg-box').show();
    });

    $('#link_login').on('click', function() {
        $('.reg-box').hide();
        $('.login-box').show();
    });

    //   校验处理
    var form = layui.form;
    var layer = layui.layer
    form.verify({
        // 自定义校验规则
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
        repwd: function(value) {
            // 通过形参拿到的是确认密码框中的内容
            // 还需要拿到密码框中的内容
            // 然后进行一次等于的判断
            // 如果判断失败,则return一个提示消息即可
            var pwd = $('.reg-box [name=password]').val();
            if (pwd !== value) {
                return '两次密码不一致！';
            }
        },
    });

    /**
     * 注册实现
     */
    $('#form-reg').on('submit', function(e) {
        e.preventDefault();
        // console.log(12312312);
        var data = {
            // 接口坑   接口坑  接口坑
            username: $('#form-reg [name=username]').val(),
            password: $('#form-reg [name=password]').val(),
            repassword: $('#form-reg [name=repassword]').val()
        };
        //   console.log(data);
        $.post('/api/reg', data, function(res) {
            console.log(res);
            if (res.code !== 0) {
                return layer.msg(res.message);
            }
            layer.msg('注册成功，请登录！');
            // 跳转
            $('#link_login').click();
        });
    });
    //   登录实现
    $('#form-login').on('submit', function(e) {
        e.preventDefault();
        $.ajax({
            type: 'post',
            url: '/api/login',
            data: $(this).serialize(),
            success: function(response) {
                console.log(response);
                if (response.code !== 0) {
                    return layer.msg(response.message);
                }
                layer.msg('登录成功！');
                // 将登录成功得到的 token 字符串，保存到 localStorage 中
                localStorage.setItem('token', response.token);
                // 跳转到后台主页
                location.href = '/index.html';
            },
        });
    });









});