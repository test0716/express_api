var express = require('express');
var router = express.Router();
var request = require('request');

router.post('/', function(req, res){

  try{
    //メッセージ内容
    var tweet = req.body.text;
    //ルームID 該当のチャットルームを開いた時のURL #!ridの後の数値部分
    var room_id = req.body.room_id;
    var options = {
        url: 'https://api.chatwork.com/v2/rooms/'+room_id+'/messages',
        headers: {
          //ユーザ毎に発行するAPIトークン、ボットではなく該当ユーザでメッセージが投稿される。
          'X-ChatWorkToken': req.body.token
        },
        form: { body: tweet },
        json: true
    };

    request.post(options, function (error, response, body) {
        if (!error && response.statusCode == 200) {

          res.send({"status":response.statusCode,"body":body});

        }else{

          console.log('error:'+ response.statusCode);

          res.send({"status":response.statusCode});
        }
    });

  }catch(error){
    
    var param ={"status":false,"message":error};
    return res.send(param);
  }

});

module.exports = router;

