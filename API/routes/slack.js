const express = require('express');
var router = express.Router();
const { WebClient } = require('@slack/web-api');

router.post('/', function(req, res) {
  // bodyからtoken、channel、textを取得
  console.log(req.body);
  try {
    (async () => {
      // OAuth トークン
      const token  = req.body.token;
      // #チャンネル名 of @ユーザー名
      const channel = req.body.channel;
      // メッセージ
      const text = req.body.text;

      const client = new WebClient(token);
      const response = await client.chat.postMessage({ channel, text });

      // 投稿に成功すると `ok` フィールドに `true` が入る。
      console.log(response.ok);
      var param = {"status":response.ok};
      res.header('Content-Type', 'application/json; charset=utf-8')
      return res.send(param);
    })();

  }catch(error){
    var param ={"status":false,"message":error};
    return res.send(param);
  }
  
});
module.exports = router;

