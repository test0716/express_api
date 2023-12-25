var express = require('express');
var router = express.Router();
const axios = require(`axios`)

router.post('/', function(req, res){

  //webhookurlをパラメータに指定
  const WEBHOOK_URL = req.body.url;

  //投稿内容を指定
  const text = req.body.text;
  axios.post(WEBHOOK_URL, {
    text: text,
  })
  .then(() => {
    var param = {"status":true,"message":"メッセージの投稿に成功しました"};
    return res.send(param);
  })
  .catch((err) => {
    var param = {"status":false,"message":err};
    return res.send(param);
  })

});

module.exports = router;

