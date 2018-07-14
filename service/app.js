const express = require('express');
const app = new express();

app.get('/test', function (req, res) {
  res.send({
    data: '我是后台数据'
  })
});

const server = app.listen(3000, () => {
  console.log('服务器启动了')
})