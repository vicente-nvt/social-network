require.config({
    paths: {
        jQuery: '/js/libs/jquery',
        Underscore: '/js/libs/underscore.js',
        Backbone: '/js/libs/backbone.js',
        text: '/js/libs/text.js',
        templates: '../templates'
    },
    shim: {
        'Backbone' : ['Underscore', 'jQuery'],
        'SocialNet' : ['Backbone']
    }
});

require(['SocialNet'], (socialNet) => {
    socialNet.Initialize();
})