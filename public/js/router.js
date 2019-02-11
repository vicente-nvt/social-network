define(['views/index', 'views/register', 'views/login', 'views/forgotpassword'],
    (IndexView, RegisterView, LoginView, ForgotPasswordView) => {
        var SocialRouter = Backbone.Router.extend({
            currentView: null,
            routes: {
                "index": "index",
                "login": "login",
                "register": "register",
                "forgotpassword": "forgotpassword"
            },
            changeView: (view) => {
                if (null != this.currentView)
                    this.currentView.undelegateEvents();
                this.currentView = view;
                this.currentView.render();
            },
            index: () => {
                this.changeView(new IndexView);
            },
            login: () => {
                this.changeView(new LoginView);
            },
            forgotpassword: () => {
                this.changeView(new ForgotPasswordView);
            },
            register: () => {
                this.changeView(new RegisterView);
            }
        });

        return new SocialRouter();
    }
);