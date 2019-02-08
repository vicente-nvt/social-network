define(['text!templates/index.html'], (indexTemplate) => {
    var indexView = Backbone.View.extend({
        el: $('#content'),
        render: () => {
            this.$el.html(indexTemplate);
        }
    })

    return new indexView;
})