const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const jwt = require('jsonwebtoken');
const fs= require('fs');
const port = 5000;
const pubKey = fs.readFileSync('public.pem');
const bodyParser = require('body-parser');



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

server.listen(port, () => {
    console.log('listening on *:'+port);
});



const io = require('socket.io')(server,{
    allowEIO3: false,
    cors:{
        credentials: true
    }
});


const mainNamespace = io.of("/");


app.post('/create_report', (req, res) => {
    console.log("New Report");
    console.log(req.body)
    mainNamespace.to('user_id_'+req.body.report.user_id).emit('new_report',req.body);
    res.status(200).json({message: 'ok'});
});
app.post('/message_am', (req, res) => {
    console.log("Message Admin-Manager");
    console.log(req.body)
    mainNamespace.to('user_id_'+req.body.report_message.to).emit('report_message',req.body);
    res.status(200).json({message: 'ok'});
});
app.post('/message_mu', (req, res) => {
    console.log("Message Manager-User");
    console.log(req.body)
    mainNamespace.to('user_id_'+req.body.report_message.to).emit('report_message',req.body);
    res.status(200).json({message: 'ok'});
});
app.post('/message_au', (req, res) => {
    console.log("Message Admin-User");
    console.log(req.body)
    mainNamespace.to('user_id_'+req.body.report_message.to).emit('report_message',req.body);
    res.status(200).json({message: 'ok'});
});
app.post('/accept_report', (req, res) => {
    console.log("Accept Report");
    console.log(req.body)
    mainNamespace.to('user_id_'+req.body.report.to).emit('report_accepted',req.body);
    res.status(200).json({message: 'ok'});
});



  //verify if the connected user is allowed by decrypting the jwt
  function isValid(token, next, socket) {

      jwt.verify(token, pubKey, {
          algorithms: ['RS256']
      }, (err, payload) => {
          if (err === null) {
              console.log("Authorized Client");
              socket.user_id = payload['sub'];
              socket.join('user_id_'+socket.user_id )
              console.log(socket.user_id)
              next();
          } else if (err.name === 'TokenExpiredError') {
              console.log("Un-authorized Client, TokenExpiredError");
          } else if (err.name === 'JsonWebTokenError') {
              console.log("Un-authorized Client, JsonWebTokenError");
          }
      });
  }

  // Middlware Authentification ///////////////

    mainNamespace.use(function(socket, next) {
      try {
          isValid(socket.request._query['token'], next, socket);
      } catch (e) {
          console.log('error: ', e);
          socket.disconnect();
      } 
  });


////////////////////////////////////////////////////////


mainNamespace.on('connection', (socket) =>{
    console.log("New User is Here in DBounty Plateform");
    socket.on("disconnect", (reason) => {
    console.log(socket.user_id+" has been disconnected")
    });
    
    socket.on('disconnecting', function(){
      
    }); 


})  






