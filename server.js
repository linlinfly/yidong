var express = require('express'); //获取express构造函数
var querystring = require("querystring");
var bodyParser = require('body-parser'); //作为express的插件
var mongoose = require("mongoose"); //导入mongoose库
var app = express();

//链接数据库

mongoose.connect('mongodb://localhost:27017/users'); //第一块内容是协议，第二块内容是协议和端口，第三块你链接的数据库
//需要一个链接正常的反馈
var db = mongoose.connection //获取数据库链接对象

db.once('open', function() {
    console.log("数据库链接成功！");
})

//导入user model

var User = require('./models/user');
// var Content = require('./models/content');
// var upload = require('./util/upload');

app.use(express.static('assets'))



app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.post('/api/register', function(req, res) {
    console.log(req.body);

    //先去查一下次，如果返回的值不是空，说明注册过了

    var u = new User({ //创建一个model 实例
        name: req.body.name,
        pwd: req.body.pwd,
        phone: req.body.phone
    });

    u.save(function(err, user) {
        if (err) {

            return

        };


        res.json({ //返回前端一个json对象
            code: 0,
            msg: "注册成功！"
        });
        console.log(user)
    });


})

app.post('/api/login', function(req, res) {
    var { name, pwd } = req.body; //对象解构

    User.find({ //对象的简写
            name,
            pwd
        }, function(err, doc) {
            //console.log(doc)
            if (err) {
                return
            };
            if (doc.length) {
                res.json({
                    code: 0,
                    msg: "登陆成功！"
                })
            } else {
                res.json({
                    code: 1,
                    msg: "用户名/密码错误"
                })
            };
        }) //对象的简写

})

//处理评论的提交
// app.post("/api/content", function(req, res) {
//     var con = new Content(req.body);
//     con.save(function(err, doc) {
//         if (err) {
//             return
//         };
//         res.json({ code: 0, content: doc });
//     })
// })


//处理文件上传的请求

// app.post('/api/upload', function(req, res) {
//     upload.upload(req, res);
// })

app.listen(8080, function() {
    console.log("创建成功！")
})