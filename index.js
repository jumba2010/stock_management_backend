const config = require('config');
const express = require('express');
var fs = require('fs');
const user = require('./routes/user');
const worker = require('./routes/worker');
const auth = require('./routes/auth');
const product = require('./routes/product');
const producttax = require('./routes/producttax');
const tax = require('./routes/tax');
const path = require('path');
const profile = require('./routes/profile');
const promotion = require('./routes/promotion');
const provider = require('./routes/provider');
const sale = require('./routes/sale');
const saleitem = require('./routes/saleitem');
const stock = require('./routes/stock');
const group = require('./routes/group');
const client = require('./routes/client');
const unity = require('./routes/unity');
const category = require('./routes/category');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const cors = require('cors');
const app = express();



app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:8000");
  res.header("Access-Control-Allow-Methods", "*");
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(express.json());
app.use('/api/user', user);
app.use('/api/auth', auth);
app.use('/api/worker', worker);
app.use('/api/product', product);
app.use('/api/producttax',producttax);
app.use('/api/profile', profile);
app.use('/api/promotion', promotion);
app.use('/api/provider', provider);
app.use('/api/sale', sale);
app.use('/api/saleitem', saleitem);
app.use('/api/stock', stock);
app.use('/api/group',group);
app.use('/api/client',client);
app.use('/api/tax', tax);
app.use('/api/unity', unity);
app.use('/api/category', category);

app.use('/public/files', express.static(__dirname + '/public/files'));
app.use(express.static(__dirname + '/public'));

//Configuando o ficheiro das vari??veis de ambiente. A ser removido futuramente
dotenv.config();

app.use(logger('dev'));
app.use(cors());
app.use(
  bodyParser.urlencoded({
    extended: false,
  }),
);

app.use(
  bodyParser.json()
);
app.use(cookieParser());



//Upload pictures
app.post('/api/upload/pictures', (req, res, next) => {  

  //Escrevendo o conteudo em pequenos chunks
 var bufferStream = new stream.PassThrough();
 bufferStream.end(new Buffer(req.files.file.data));
 bufferStream.pipe(
   bucket.file(req.files.file.name).createWriteStream({
     resumable: false,
     metadata:{
       contentType: req.files.file.mimetype
     },    
     gzip: true
   })
 )
 .on("finish",  () => {
   console.log('Upload para o google cloud  Feito com sucesso');
   res.json({ file:  req.files.file.name});
 })

});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});


// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  console.log(err)
 
});

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'jade')

app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});


 app.listen(process.env.PORT, '127.0.0.1',() => {
  console.log(`server running on port ${process.env.PORT}`);

}
) 
