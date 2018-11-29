var express = require('express')
var bodyParser = require('body-parser')
var User = require('./user')
var md5 = require('blueimp-md5')
var session = require('express-session')

// 创建app
var app = express()

//公开public的资源
app.use('/node_modules/', express.static('./node_modules/'))
app.use('/public/', express.static('./public/'))

//配置使用模板引擎
app.engine('html', require('express-art-template'))

// app.set('views', path.join(__dirname, './views/')) // 默认就是 ./views 目录
//配置body-parser中间件，用于解析post表单请求体
app.use(bodyParser.urlencoded({
    extended: false
}))
app.use(bodyParser.json())

app.use(session({
    // 配置加密字符串，它会在原有加密基础之上和这个字符串拼起来去加密
    // 目的是为了增加安全性，防止客户端恶意伪造
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false // 无论你是否使用 Session ，我都默认直接给你分配一把钥匙
}))

//首页
app.get('/', function (req, res) {
    res.render('gulugulu-index.html', {
        user: req.session.user
    })
})
//直播间
app.get('/gulugulu-live', function (req, res) {
    res.render('gulugulu-live.html', {
        user: req.session.user
    })
})
//分类
app.get('/gulugulu-divide', function (req, res) {
    res.render('gulugulu-divide.html', {
        user: req.session.user
    })
})
//历史
app.get('/gulugulu-history', function (req, res) {
    res.render('gulugulu-history.html')
})
// 关于我们
app.get('/gulugulu-AboutUs', function (req, res) {
    res.render('gulugulu-AboutUs.html', {
        user: req.session.user
    })
})
//详情
app.get('/gulugulu-detail', function (req, res) {
    res.render('gulugulu-detail.html', {
        user: req.session.user
    })
})

app.post('/register', function (req, res) {
    var body = req.body
    User.findOne({
        $or: [{
                email: body.email
            },
            {
                username: body.username
            }
        ]
    }, function (err, data) {
        if (err) {
            return res.status(500).json({
                success: false,
                message: '服务端错误'
            })
        }
        if (data) {
            // 邮箱或者昵称已存在
            return res.status(200).json({
                err_code: 1,
                message: 'Email or nickname aleady exists.'
            })
            // return res.send(`邮箱或者密码已存在，请重试`)
        }

        // 对密码进行 md5 重复加密
        body.pw1 = md5(md5(body.pw1))
        console.log("pw1: " + body.pw1)
        new User(body).save(function (err, user) {
            if (err) {
                return res.status(500).json({
                    err_code: 500,
                    message: 'Internal error.'
                })
            }

            // 注册成功，使用 Session 记录用户的登陆状态
            req.session.user = user

            // Express 提供了一个响应方法：json
            // 该方法接收一个对象作为参数，它会自动帮你把对象转为字符串再发送给浏览器
            res.status(200).json({
                err_code: 0,
                message: 'OK'
            })

            // 服务端重定向只针对同步请求才有效，异步请求无效
            // res.redirect('/')
        })
    })
})

app.post('/login', function (req, res) {
    // 1. 获取表单数据
    // 2. 查询数据库用户名密码是否正确
    // 3. 发送响应数据
    var body = req.body

    User.findOne({
        username: body.username,
        pw1: md5(md5(body.pw1))
    }, function (err, user) {
        if (err) {
            return res.status(500).json({
                err_code: 500,
                message: err.message
            })
        }

        // 如果邮箱和密码匹配，则 user 是查询到的用户对象，否则就是 null
        if (!user) {
            return res.status(200).json({
                err_code: 1,
                message: 'Email or password is invalid.'
            })
        }

        // 用户存在，登陆成功，通过 Session 记录登陆状态
        req.session.user = user

        res.status(200).json({
            err_code: 0,
            message: 'OK'
        })
    })
})
app.get('/logout', function (req, res) {
    // 清除登陆状态
    req.session.user = null

    // 重定向到登录页
    res.redirect('/')
})

app.listen(8003, function () {
    console.log('express is running...')
})