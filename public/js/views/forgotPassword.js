define(['text!templates/forgotPassword.html'], (forgotPasswordTemplate) => {
  var forgotPasswordView = Backbone.View.extend({
    el: $('#content'),
    events: {
      'submit form': 'resetPassword'
    },
    resetPassword: function () {
      $.post('/account/forgotPassword', {
        email: $('input[name=email]').val()
      },
        (data) => { console.log(data) })
      return false
    },
    render: function () {
      this.$el.html(forgotPasswordTemplate)
    }
  })

  return forgotPasswordView
})
