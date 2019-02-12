define(['text!templates/login.html'], (loginTemplate) => {
    var loginView = Backbone.View.extend({
        el: $('#content'),
        events: {
            "submit form": "login"
        },
        login: function () {
            $.post('/login', {
                email: $('input[name=email]').val(),
                password: $('input[name=password').val()
            },
                (data) => { console.log(data); })
                .error(() => {
                    let error = $("#error");
                    $(error).text('Unable to login');
                    $(error).slideDown();
                });
            return false;
        },
        render: function () {
            this.$el.html(loginTemplate);
            $("#error").hide();
        }
    });

    return loginView;
})