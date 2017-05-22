var mongodb = require('./db.js');
var util = require('util');

function PublishSocial(publish) {
    this.title = publish.title;
    this.content = publish.content;
    this.time = publish.time;
    this.author = publish.author;
}

module.exports = PublishSocial;
var date = new Date();

var time = {
    date: date,
    year: date.getFullYear(),
    month: date.getFullYear() + "-" + (date.getMonth() + 1),
    day: date.getFullYear() + "-" + ((date.getMonth()) + 1) + '-' + date.getDate(),
    second: date.getFullYear() + "-" + (date.getMonth() + 1) + '-' + date.getDate() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds(),
};

PublishSocial.prototype.save = function(callback) {

    // 将数据 转换成 对象字面量，后面插入数据库的时候，传入的是对象字面量
    var publish = {
        title: this.title,
        content: this.content,
        time: time,
        author: this.author,
        of: 'Social'
    };
    mongodb.open(function(error, db) {
        if (error) {
            return callback(error);
        }
        db.collection('publishSocial', function(err, collection) {
            if (err) {
                mongodb.close();
                return callback(err);
            }

            collection.insert(publish, {
                safe: true
            }, function(err, publishes) {
                mongodb.close();
                if (err) {
                    return callback(err);
                }
                callback(null);

            });


        });

    });

};

PublishSocial.getAll = function(username, callback) {

    // process.stdout.write("作者："+author+"\n");
    mongodb.open(function(err, db) {
        if (err) {
            mongodb.close();
            return callback(err);
        }
        db.collection('publishSocial', function(err, collection) {
            // mongodb.close();  这里数据库不能关闭，直到找到文档才能关闭

            if (err) {
                return callback(err);
            }
            /*collection.find({        // find 函数形参没有回调函数 ， 
                author: author
            }, function (err, publishes) {
                if (err) {
                    return callback(err);
                }
                callback(null, publishes);
            });*/

            //  find  函数返回的 是 Cursor（游标对象），所有满足条件的文档的集合\
            var user = {};
            if (username) {
                user.author = username;
            }
            collection.find(user).sort({
                "time": -1 //  -1 表示降序 
            }).toArray(function(err, docs) { //  将Cursor 游标转化为真实的数组，并保存在 docs 中
                mongodb.close();
                if (err) {
                    // process.stdout.write("出错了");
                    return callback(err);
                }

                callback(null, docs);
            });



        });
    });

};

PublishSocial.getOne = function(author, second, title, callback) {
    mongodb.open(function(err, db) {
        if (err) {
            return callback(err);
        }
        db.collection("publishSocial", function(err, collection) {
            if (err) {
                return callback(err);
            }
            collection.findOne({
                "author": author,
                "title": title
            }, function(err, publish) {
                mongodb.close();
                if (err) {
                    return callback(err);
                }


                return callback(null, publish);
            });

        });

    });
};

//返回原始发表的内容
PublishSocial.edit = function(name, day, title, callback) {
    //打开数据库
    mongodb.open(function(err, db) {
        if (err) {
            return callback(err);
        }
        //读取 posts 集合
        db.collection('publishSocial', function(err, collection) {
            if (err) {
                mongodb.close();
                return callback(err);
            }
            //根据用户名、发表日期及文章名进行查询
            collection.findOne({
                "author": name,
                "time.second": day,
                "title": title
            }, function(err, doc) {
                mongodb.close();
                if (err) {
                    return callback(err);
                }
                callback(null, doc); //返回查询的一篇文章
            });
        });
    });
};
//更新一篇文章及其相关信息
PublishSocial.update = function(name, day, title, post, callback) {
    //打开数据库
    mongodb.open(function(err, db) {
        if (err) {
            return callback(err);
        }
        //读取 posts 集合
        db.collection('publishSocial', function(err, collection) {
            if (err) {
                mongodb.close();
                return callback(err);
            }

            //更新文章内容
            collection.update({
                "author": name,
                "time.second": day,

            }, {
                $set: { content: post, title: title }
            }, function(err) {
                mongodb.close();
                if (err) {
                    return callback(err);
                }
                callback(null);
            });
        });
    });
};

//删除一篇文章
PublishSocial.remove = function(name, second, title, callback) {
    //打开数据库
    mongodb.open(function(err, db) {
        if (err) {
            return callback(err);
        }
        //读取 posts 集合
        db.collection('publishSocial', function(err, collection) {
            if (err) {
                mongodb.close();
                return callback(err);
            }
            //根据用户名、日期和标题查找并删除一篇文章
            collection.remove({
                "author": name,
                "time.second": second,
                "title": title
            }, {
                w: 1
            }, function(err) {
                mongodb.close();
                if (err) {
                    return callback(err);
                }
                callback(null);
            });
        });
    });
};