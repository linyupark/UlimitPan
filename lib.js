var

R = require("request"),
  
  _cookies,

  getTime = function() {
    return new Date().getTime();
  },

  run = function(cb) {
    var cookie, token;
    // 拿cookie
    R("http://www.baidu.com", function(err, res) {
      if (err) {
        throw "get BAIDUID request error!";
      }
      cookie = res.headers['set-cookie'][0];
      // 拿token
      R({
        url: "https://passport.baidu.com/v2/api/?getapi&tpl=mn&apiver=v3&class=login&tt=" + getTime() + "&logintype=dialogLogin&callback=",
        headers: {
          'Cookie': cookie
        }
      }, function(err, res, body) {
        if (err) {
          throw "get TOKEN request error!";
        }
        token = res.body.match(/token\" : \"(.{32})\"/)[1];
        // 拿权限
        R({
          url: "https://passport.baidu.com/v2/api/?login",
          method: "POST",
          headers: {
            'Cookie': cookie
          },
          form: {
            staticpage: "http://www.baidu.com/cache/user/html/v3Jump.html",
            charset: "UTF-8",
            token: token,
            tpl: "mn",
            apiver: "v3",
            tt: getTime(),
            codestring: "",
            isPhone: false,
            safeflg: 0,
            u: "http://www.baidu.com",
            quick_user: 0,
            usernamelogin: 1,
            splogin: "rate",
            username: "linyupark",
            password: "123!@#123",
            verifycode: "",
            mem_pass: "on",
            ppui_logintime: Math.floor(Math.random() * 10001),
            callback: "parent.bd__pcbs__oa36qm"
          }
        }, function(err, res) {
          if (err) {
            throw "get TOKEN request error!";
          }
          _cookies = res.headers['set-cookie'].join(";");
          cb.call(this, _cookies);
        })
      })
    })
  };

module.exports = {
  init: run,
  // 务必在init执行回调后再用
  rest: function(url, cb) {
    console.log(_cookies);
    R({
      url: url,
      headers: {
        'Cookie': _cookies
      }
    }, function(err, res, body) {
      if (err) {
        throw "get API request error!";
      }
      cb.call(this, body);
    })
  },
  // 来自 js2.me的分享
  shared: function(id, url, cb){
    R({
      url: "http://js2.me/share_account_list.php?id="+id
    }, function(err, res, body) {
      if (err) {
        throw "get shared request error!";
      }
      _cookies = JSON.parse(body).cookie.replace(/\|wappass\.baidu\.com\|/g, ";domain=wappass.baidu.com; path=/;").replace(/\|/g, "=");
      console.log(_cookies);
      R({
        url: url,
        headers: {
          'Cookie': _cookies
        }
      }, function(err, res, body) {
        if (err) {
          throw "get API request error!";
        }
        cb.call(this, body);
      })
    })
  }
};
