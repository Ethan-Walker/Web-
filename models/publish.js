var mongodb = require('./db.js');
var util = require('util');

function Publish(publish) {
    this.title = publish.title;
    this.content = publish.content;
    this.time = publish.time;
    this.author = publish.author;
}

module.exports = Publish;
var date = new Date();

var time = {
    date: date,
    year: date.getFullYear(),
    month: date.getFullYear() + "-" + (date.getMonth() + 1),
    day: date.getFullYear() + "-" + ((date.getMonth()) + 1) + '-' + date.getDate(),
    second: date.getFullYear() + "-" + (date.getMonth() + 1) + '-' + date.getDate() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds(),
};

Publish.prototype.save = function(callback) {

    // 将数据 转换成 对象字面量，后面插入数据库的时候，传入的是对象字面量
    var publish = {
        title: this.title,
        content: this.content,
        time: time,
        author: this.author,
        of: "publishes"
    };
    mongodb.open(function(error, db) {
        if (error) {
            return callback(error);
        }
        db.collection('publishes', function(err, collection) {
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

Publish.getAll = function(username, callback) {

    // process.stdout.write("作者："+author+"\n");
    mongodb.open(function(err, db) {
        if (err) {
            mongodb.close();
            return callback(err);
        }
        db.collection('publishes', function(err, collection) {
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

Publish.getOne = function(author, second, title, callback) {
    mongodb.open(function(err, db) {
        if (err) {
            return callback(err);
        }
        db.collection("publishes", function(err, collection) {
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
Publish.edit = function(name, day, title, callback) {
    //打开数据库
    // process.stdout.write('作者:' + name + "\n" + "时间：" + day + "\n" + "题目:" + title + '\n');
    mongodb.open(function(err, db) {
        if (err) {
            return callback(err);
        }
        //读取 posts 集合
        db.collection('publishes', function(err, collection) {
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
Publish.update = function(name, second, title, post, callback) {
    //打开数据库
    // process.stdout.write('作者:' + name + "\n" + "时间：" + second + "\n" + "题目:" + title + '\n');
    mongodb.open(function(err, db) {
        if (err) {
            return callback(err);
        }
        //读取 posts 集合
        db.collection('publishes', function(err, collection) {
            if (err) {
                mongodb.close();
                return callback(err);
            }
            //更新文章内容
            collection.update({
                "author": name,
                "time.second": second,


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
Publish.remove = function(name, second, title, callback) {
    //打开数据库
    mongodb.open(function(err, db) {
        if (err) {
            return callback(err);
        }
        //读取 posts 集合
        db.collection('publishes', function(err, collection) {
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