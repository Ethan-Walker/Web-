var crypto = require('crypto');
var User = require('../models/user.js');
var Publish = require('../models/publish.js');
var PublishSocial = require('../models/publishSocial.js');
var PublishCampus = require('../models/publishCampus.js');
var PublishFun = require('../models/publishFun.js');
var util = require('util');



module.exports = function(app) {

    app.get('/', function(req, res) {

        Publish.getAll(null, function(err, publishes) {
            if (err) {
                publishes = [];

            }
            PublishSocial.getAll(null, function(err, publishSocial) {
                if (err) {
                    publishSocial = [];
                }
                PublishCampus.getAll(null, function(err, publishCampus) {
                    if (err) {
                        publishCampus = [];
                    }
                    PublishFun.getAll(null, function(err, publishFun) {
                        if (err) {
                            publishFun = [];
                        }
                        res.render('index', {
                            user: req.session.user,
                            publishes: publishes,
                            publishSocial: publishSocial,
                            publishCampus: publishCampus,
                            publishFun: publishFun
                        });
                    });
                });
            });


        });
    });
    app.get('/publish', function(req, res) {
        // process.stdout.write('怕怕怕怕怕怕怕');
        res.render('publish', {
            user: req.session.user
        });

    });
    app.post('/publish', function(req, res) {
        var newPublish = new Publish({
            title: req.body.title,
            content: req.body.content,
            author: req.session.user.name
        });
        newPublish.save(function(err) {
            if (err) {
                req.flash('error', '发表失败!');
                return res.redirect('back');
            }
            req.flash('success', '发表成功！');
            res.redirect('/news');
        });

    });



    app.get('/edit/:tag/:name/:second/:title', checkLogin);
    app.get('/edit/:tag/:name/:second/:title', function(req, res) {
        var currentUser = req.session.user;
        if (req.params.tag.indexOf('publishes') != -1) {
            Publish.edit(currentUser.name, req.params.second, req.params.title, function(err, publish) {

                if (err) {
                    req.flash('error', err);
                    return res.redirect('back');
                }
                res.render('edit', {
                    publish: publish,
                    user: req.session.user,
                    success: req.flash('success').toString(),
                    error: req.flash('error').toString()
                });
            });
        } else if (req.params.tag.indexOf('Social') != -1) {
            PublishSocial.edit(currentUser.name, req.params.second, req.params.title, function(err, publish) {
                if (err) {
                    req.flash('error', err);
                    return res.redirect('back');
                }
                res.render('edit', {
                    publish: publish,
                    user: req.session.user,
                    success: req.flash('success').toString(),
                    error: req.flash('error').toString()
                });
            });
        } else if (req.params.tag.indexOf('Campus') != -1) {
            PublishCampus.edit(currentUser.name, req.params.second, req.params.title, function(err, publish) {
                if (err) {

                    req.flash('error', err);
                    return res.redirect('back');
                }
                res.render('edit', {
                    publish: publish,
                    user: req.session.user,
                    success: req.flash('success').toString(),
                    error: req.flash('error').toString()
                });
            });
        } else if (req.params.tag.indexOf('Fun') != -1) {
            PublishFun.edit(currentUser.name, req.params.second, req.params.title, function(err, publish) {

                if (err) {

                    req.flash('error', err);
                    return res.redirect('back');
                }
                res.render('edit', {
                    publish: publish,
                    user: req.session.user,
                    success: req.flash('success').toString(),
                    error: req.flash('error').toString()
                });
            });
        }

    });

    app.post('/edit/:tag/:author/:second/:title', checkLogin);
    app.post('/edit/:tag/:author/:second/:title', function(req, res) {
        var currentUser = req.session.user;
        // process.stdout.write('文章内容:' + req.body.content);
        if (req.params.tag.indexOf('publishes') != -1) {
            Publish.update(currentUser.name, req.params.second, req.body.title, req.body.content, function(err) {
                var url = encodeURI('/u/' + req.params.author + '/' + req.params.second + '/' + req.body.title);
                if (err) {
                    // process.stdout.write('修改错误1');
                    req.flash('error', err);
                    return res.redirect(url); //出错！返回文章页
                }
                req.flash('success', '修改成功!');
                res.redirect(url); //成功！返回文章页
            });
        } else if (req.params.tag.indexOf('Campus') != -1) {
            PublishCampus.update(currentUser.name, req.params.second, req.body.title, req.body.content, function(err) {
                var url = encodeURI('/j/' + req.params.author + '/' + req.params.second + '/' + req.body.title);
                if (err) {
                    // process.stdout.write('修改错误2');

                    req.flash('error', err);
                    return res.redirect(url); //出错！返回文章页
                }
                req.flash('success', '修改成功!');
                res.redirect(url); //成功！返回文章页
            });
        } else if (req.params.tag.indexOf('Social') != -1) {
            PublishSocial.update(currentUser.name, req.params.second, req.body.title, req.body.content, function(err) {
                var url = encodeURI('/s/' + req.params.author + '/' + req.params.second + '/' + req.body.title);
                if (err) {
                    // process.stdout.write('修改错误3');

                    req.flash('error', err);
                    return res.redirect(url); //出错！返回文章页
                }
                req.flash('success', '修改成功!');
                res.redirect(url); //成功！返回文章页
            });
        } else if (req.params.tag.indexOf('Fun') != -1) {
            PublishFun.update(currentUser.name, req.params.second, req.body.title, req.body.content, function(err) {
                var url = encodeURI('/y/' + req.params.author + '/' + req.params.second + '/' + req.body.title);
                if (err) {
                    // process.stdout.write('修改错误4');

                    req.flash('error', err);
                    return res.redirect(url); //出错！返回文章页
                }
                req.flash('success', '修改成功!');
                res.redirect(url); //成功！返回文章页
            });
        }

    });


    app.get('/remove/:tag/:author/:second/:title', checkLogin);
    app.get('/remove/:tag/:author/:second/:title', function(req, res) {
        process.stdout.write('链接成功');
        var currentUser = req.session.user;
        var url = '';
        if (req.params.tag.indexOf('publishes') != -1) {
            url = encodeURI('/user/' + req.params.author + '/');
            Publish.remove(currentUser.name, req.params.second, req.params.title, function(err) {
                if (err) {
                    req.flash('error', err);
                    return res.redirect('back');
                }
                req.flash('success', '删除成功!');
                res.redirect(url);
            });
        } else if (req.params.tag.indexOf('Campus') != -1) {
            url = encodeURI('/user/' + req.params.author + '/');
            PublishCampus.remove(currentUser.name, req.params.second, req.params.title, function(err) {
                if (err) {
                    req.flash('error', err);
                    return res.redirect('back');
                }
                req.flash('success', '删除成功!');
                res.redirect(url);
            });
        } else if (req.params.tag.indexOf('Social') != -1) {
            url = encodeURI('/user/' + req.params.author + '/');
            PublishSocial.remove(currentUser.name, req.params.second, req.params.title, function(err) {
                if (err) {
                    req.flash('error', err);
                    return res.redirect('back');
                }
                req.flash('success', '删除成功!');
                res.redirect(url);
            });
        } else if (req.params.tag.indexOf('Fun') != -1) {
            url = encodeURI('/user/' + req.params.author + '/');
            PublishFun.remove(currentUser.name, req.params.second, req.params.title, function(err) {
                if (err) {
                    req.flash('error', err);
                    return res.redirect('back');
                }
                req.flash('success', '删除成功!');
                res.redirect(url);
            });
        }

    });



    app.get('/logout', function(req, res) {
        req.session.user = null;
        res.redirect('/');
    });

    app.get('/news', function(req, res) {
        Publish.getAll(null, function(err, publishes) {
            if (err) {
                news = [];
            }
            res.render('news', {
                user: req.session.user,
                publishes: publishes,
                success: req.flash('success').toString(),
                error: req.flash('error').toString()
            });
        });
    });

    app.get('/social', function(req, res) {
        PublishSocial.getAll(null, function(err, publishes) {
            if (err) {
                news = [];
            }
            res.render('social', {
                user: req.session.user,
                publishes: publishes,
                success: req.flash('success').toString(),
                error: req.flash('error').toString()
            });
        });

    });

    app.get('/publishSocial', function(req, res) {

        res.render('publishSocial', {
            user: req.session.user,
        });

    });

    app.post('/publishSocial', function(req, res) {
        var newPublish = new PublishSocial({
            title: req.body.title,
            content: req.body.content,
            author: req.session.user.name
        });
        newPublish.save(function(err) {
            if (err) {
                req.flash('error', '发表失败!');
                return res.redirect('back');
            }
            req.flash('success', '发表成功！');
            res.redirect('/social');
        });
    });


    app.get('/campusjidi', function(req, res) {
        PublishCampus.getAll(null, function(err, publishes) {
            if (err) {
                publishes = [];
            }
            res.render('campusjidi', {
                user: req.session.user,
                publishes: publishes,
                success: req.flash('success').toString(),
                error: req.flash('error').toString()
            });
        });

    });
    app.get('/fun', function(req, res) {
        PublishFun.getAll(null, function(err, publishes) {
            if (err) {
                publishes = [];
            }
            res.render('fun', {
                user: req.session.user,
                publishes: publishes,
                success: req.flash('success').toString(),
                error: req.flash('error').toString()
            });
        });

    });


    app.get('/publishCampus', function(req, res) {
        res.render('publishCampus', {
            user: req.session.user
        });

    });
    app.get('/publishFun', function(req, res) {
        res.render('publishFun', {
            user: req.session.user
        });

    });
    app.post('/publishCampus', function(req, res) {
        var newPublish = new PublishCampus({
            title: req.body.title,
            content: req.body.content,
            author: req.session.user.name
        });
        newPublish.save(function(err) {
            if (err) {
                req.flash('error', '发表失败!');
                return res.redirect('back');
            }
            req.flash('success', '发表成功！');
            res.redirect('/campusjidi');
        });
    });
    app.post('/publishFun', function(req, res) {
        var newPublish = new PublishFun({
            title: req.body.title,
            content: req.body.content,
            author: req.session.user.name
        });
        newPublish.save(function(err) {
            if (err) {
                req.flash('error', '发表失败!');
                return res.redirect('back');
            }
            req.flash('success', '发表成功！');
            res.redirect('/fun');
        });
    });

    /*校园新闻*/
    app.get('/u/:author/:second/:title', function(req, res) {
        Publish.getOne(req.params.author, req.param.second, req.params.title, function(err, publish) {
            if (err) {
                req.flash('error', err);
                return res.redirect('/');
            }

            res.render('news-content', {
                user: req.session.user,
                news: publish,
                error: req.flash('error').toString(),
                success: req.flash('success').toString()
            });
        });

    });
    /*社团*/
    app.get('/s/:author/:second/:title', function(req, res) {
        PublishSocial.getOne(req.params.author, req.param.second, req.params.title, function(err, publish) {
            if (err) {
                req.flash('error', err);
                return res.redirect('/');
            }

            res.render('news-content', {
                user: req.session.user,
                news: publish,
                error: req.flash('error').toString(),
                success: req.flash('success').toString()
            });
        });

    });
    /*基地*/
    app.get('/j/:author/:second/:title', function(req, res) {
        PublishCampus.getOne(req.params.author, req.param.second, req.params.title, function(err, publish) {
            if (err) {
                req.flash('error', err);
                return res.redirect('/');
            }

            res.render('news-content', {
                user: req.session.user,
                news: publish,
                error: req.flash('error').toString(),
                success: req.flash('success').toString()
            });
        });

    });
    /*娱乐杂谈*/
    app.get('/y/:author/:second/:title', function(req, res) {
        PublishFun.getOne(req.params.author, req.param.second, req.params.title, function(err, publish) {
            if (err) {
                req.flash('error', err);
                return res.redirect('/');
            }

            res.render('news-content', {
                user: req.session.user,
                news: publish,
                error: req.flash('error').toString(),
                success: req.flash('success').toString()
            });
        });

    });

    app.use('/login', checkNotLogin);
    app.get('/login', function(req, res) {
        res.render('login', {

            user: req.session.user,
            success: req.flash('success').toString(),
            error: req.flash('error').toString()
        });
    });

    app.use('/login', checkNotLogin);
    app.post('/login', function(req, res) {
        var md5 = crypto.createHash('md5');
        var password = md5.update(req.body.password).digest('hex');

        User.get(req.body.name, function(error, user) {
            if (error) {
                req.flash('error', error);
                return res.redirect('/');
            }
            if (!user) {
                req.flash('error', '用户不存在!');
                return res.redirect('/login');
            }

            if (user.password !== password) {
                req.flash('error', '密码错误');
                return res.redirect('/login');
            }

            req.session.user = user; // 存入 session 
            req.flash('success', '登陆成功');
            res.redirect('/');
        });

    });
    app.get('/user/:name', function(req, res) {
        var arr = [];
        var name = req.params.name;
        // process.stdout.write("姓名: " + name + '\n');
        Publish.getAll(name, function(err, publishes) {
            if (err) {
                // process.stdout.write('出错了!');
                publishes = [];

            }
            PublishSocial.getAll(name, function(err, publishSocial) {
                if (err) {
                    publishSocial = [];
                }
                PublishCampus.getAll(name, function(err, publishCampus) {
                    if (err) {
                        publishCampus = [];
                    }
                    PublishFun.getAll(name, function(err, publishFun) {
                        if (err) {
                            publishFun = [];
                        }
                        /* process.stdout.write('publishes数目:' + publishes.length + '\n');
                           process.stdout.write('publishSocial数目:' + publishSocial.length + '\n');
                            process.stdout.write('publishFun数目:' + publishFun.length + '\n');*/
                        // var result = arr.concat(publishes, publishSocial, publishFun);
                        /* process.stdout.write('文章总数' + arr.length + '\n');
                           process.stdout.write('文章总数' + result.length + '\n');*/

                        res.render('user', {
                            user: req.session.user,
                            publishes: publishes,
                            publishSocial: publishSocial,
                            publishCampus: publishCampus,
                            publishFun: publishFun,
                            username: name
                        });
                    });
                });
            });
        });
    });
    app.use('/personal', checkLogin);
    app.get('/personal', function(req, res) {
        var name = req.session.user.name;
        // process.stdout.write("姓名: " + name + '\n');
        Publish.getAll(name, function(err, publishes) {
            if (err) {
                // process.stdout.write('出错了!');
                publishes = [];

            }
            PublishSocial.getAll(name, function(err, publishSocial) {
                if (err) {
                    publishSocial = [];
                }
                PublishCampus.getAll(name, function(err, publishCampus) {
                    if (err) {
                        publishCampus = [];
                    }
                    PublishFun.getAll(name, function(err, publishFun) {
                        if (err) {
                            publishFun = [];
                        }
                        /* process.stdout.write('publishes数目:' + publishes.length + '\n');
                           process.stdout.write('publishSocial数目:' + publishSocial.length + '\n');
                            process.stdout.write('publishFun数目:' + publishFun.length + '\n');*/
                        // var result = arr.concat(publishes, publishSocial, publishFun);
                        /* process.stdout.write('文章总数' + arr.length + '\n');
                           process.stdout.write('文章总数' + result.length + '\n');*/

                        res.render('user', {
                            user: req.session.user,
                            publishes: publishes,
                            publishSocial: publishSocial,
                            publishCampus: publishCampus,
                            publishFun: publishFun,
                            username: name
                        });
                    });
                });
            });
        });
    });

    app.use('/register', checkNotLogin);
    app.get('/register', function(req, res) {
        res.render('register', {
            user: req.session.user,
            error: req.flash('error').toString(),
            success: req.flash('success').toString()
        });

    });

    app.post('/register', function(req, res) {
        var name = req.body.name;
        var password = req.body.password;
        var password_re = req.body['password-re'];

        //先检查两次输入的密码是否相同
        if (password_re != password) {
            req.flash('error', "两次输入的密码不一致!");
            return res.redirect('back');
        }

        //生成密码的md5值，进行加密
        md5 = crypto.createHash('md5');
        password = md5.update(password).digest('hex');

        var newUser = new User({
            name: name,
            password: password,
            email: req.body.email
        });

        //检查用户名是否已经存在, 在 User 里面查找 是否有名字为 newUser.name，有的话，赋值给回调函数中的user
        User.get(newUser.name, function(err, user) {
            if (err) {
                req.flash('error', err);
                process.stdout.write('失败3');
                return res.redirect('back');
            }
            if (user) {
                // 设置 请求提交的标志 为错误，并设置错误信息
                req.flash('error', '用户名已经存在');
                return res.redirect('back');
            }

            // 如果不存在新增用户
            newUser.save(function(err, user) {
                if (err) {
                    req.flash('error', err);

                    return res.redirect('back');
                }
                // 不应该存入，否则注册之后返回主页，就会导致自动登录
                req.session.user = newUser; // 用户信息存入session  
                req.flash('success', '注册成功');
                res.redirect('/'); //  注册成功，返回主页

            });

        });
    });


};




function checkNotLogin(req, res, next) {
    if (req.session.user) {
        req.flash('error', '已登录！');
        res.redirect('back'); // back 表示 停留在当前页，做出响应，后面的中间件不再响应
    }
    next();
}

function checkLogin(req, res, next) {
    if (!req.session.user) {
        req.flash('error', '已登录！');
        res.redirect('back');
    }
    next();
}