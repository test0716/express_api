var express = require('express');
var router = express.Router();
const axios = require(`axios`)

router.post('/', function(req, res){

  const WEBHOOK_URL = req.body.url;

  axios.post(WEBHOOK_URL, {
    text: req.body.text,
  })
  .then((res) => {
    var param = {"status":true};
    return res.send(param);
  })
  .catch((err) => {
    var param = {"status":false,"message":err};
    return res.send(param);
  })

});

module.exports = router;

