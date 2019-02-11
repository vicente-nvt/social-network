define(['router'], (router) => {
    var initialize = () => {
        checkLogin(runApplication);
    }

    var checkLogin = (callback) => {
        $.ajax('/account/authenticated', {
            method: 'GET',
            success: () => { return callback(true) },
            error: () => { return callback(false) }
        });
    }

    var runApplication = (authenticated) => {
        if (!authenticated)
            window.location.hash = 'login'
        else
            windows.location.hash = 'index'

        Backbone.history.start();
    }

    return {
        initialize: initialize
    }
})