module.exports = (config, mongoose, nodemailer) => {
    var crypto = require('crypto');

    var AccountSchema = new mongoose.Schema({
        email: { type: String, unique: true },
        password: { type: String },
        name: {
            first: { type: String },
            last: { type: String }
        },
        birthday: {
            day: { type: Number, min: 1, max: 31, require: false },
            month: { type: Number, min: 1, max: 12, require: false },
            year: { type: Number }
        },
        photoUrl: { type: String },
        biography: { type: String }
    });

    var Account = mongoose.model('Account', AccountSchema);

    var registerCallback = (err) => {
        if (err)
            return console.log(err);

        return console.log('Account was created');
    }

    var changePassword = (accountId, newPassword) => {
        var shaSum = crypto.createHash('sha256');
        shaSum.update(newPassword);
        var hashedPassword = shaSum.digest('hex');

        Account.update({ _id: accountId },
            { $set: { password: hashedPassword } },
            { upsert: false },
            () => { console.log('Change password done for account ' + accountId); });
    }

    var forgotPassword = (email, resetPasswordUrl, callback) => {
        Account.findOne({ email: email }, (err, doc) => {
            if (err)
                callback(false);
            else {
                var smtpTransport = nodemailer.createTransport('SMTP', config.mail);
                resetPasswordUrl += '?account=' + doc._id;
                smtpTransport.sendMail({
                    from: 'thisapp@example.com',
                    to: doc.email,
                    subject: 'SocialNet Password Request',
                    text: 'Click here to reset your password' + resetPasswordUrl
                }, (err) => {
                    if (err)
                        callback(false)
                    else
                        callback(true)
                })
            }
        });
    }

    var login = (email, password, callback) => {
        var shaSum = crypto.createHash('sha256');
        shaSum.update(password);
        Account.findOne({email: email, password: shaSum.digest('hex')}, (err, doc) => {
            callback(doc != null);
        })
    }

    var register = (email, password, firstName, lastName) => {
        var shaSum = crypto.createHash('sha256');
        shaSum.update(password);

        var user = new Account({
            email: email,
            name: { 
                first: firstName,
                last: lastName
            },
            password: shaSum.digest('hex')
        })

        user.save(registerCallback);
    }

    return {
        register: register,
        forgotPassword: forgotPassword,
        changePassword: changePassword,
        login: login,
        Account: Account
    }
}