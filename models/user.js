var mongodb = require('./db');

function User(user) {
    this.name = user.name;
    this.password = user.password;
    this.email = user.email;

}

module.exports = User;

//存储用户信息                 函数内部传一个回调函数，是希望调用者，再调用该函数的时候得到更多的信息
User.prototype.save = function(callback) {
    var user = {
        name: this.name,
        password: this.password,
        email: this.email
    };

    // 打开数据库，把数据库对象赋值给 db
    mongodb.open(function(err, db) {
        if (err) return callback(err);

        // 寻找users 文档（集合），未找到不会发生错误，会创建一个 users 文档，结果赋值给 collection 
        db.collection('users', function(err, collection) {
            if (err) {
                mongodb.close();
                return callback(err);
            }

            // 将user数据插入 users集合，这里的collection集合就是 创建的users集合
            collection.insert(user, {
                safe: true
            }, function(err, user) { //  这里的 user 代表什么？
                mongodb.close(); // 不管有没有发生错误，先关闭数据库
                if (err) {
                    return callback(err); // 错误，返回错误信息

                }


                callback(null, user[0]); // 成功，err为null，并返回存储后的用户文档
            });

        });

    });
};


//  读取用户信息

User.get = function(name, callback) {
    // 打开数据库
    mongodb.open(function(err, db) {
        if (err) return callback(err); // 打开失败，返回错误信息

        //  查找users 集合，找到则 赋值给  collection 
        db.collection('users', function(err, collection) {
            if (err) {
                mongodb.close();
                return callback(err);
            }

            // 查找用户名(name 键)值为name 一个文档，找到赋值给 user
            collection.findOne({
                name: name
            }, function(err, user) {
                mongodb.close();
                if (err) {
                    return callback(err); // 失败，返回err信息
                }
                callback(null, user); // 查找成功
            });
        });
    });

};