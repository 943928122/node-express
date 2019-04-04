let createError = require('http-errors')
let express = require('express')
let path = require('path')
let cookieParser = require('cookie-parser')
let logger = require('morgan')

let indexRouter = require('./routes/index')
let usersRouter = require('./routes/users')
let app = express()


//let swig = require('swig')

//app.engine('html', swig.renderFile)
//app.set('view engine', 'html')

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')


app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

//跨域
app.all('*', function( err, req, res, next ) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "X-Requested-With")
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS")
  res.header("X-Powered-By", ' 3.2.1')
  res.header("Content-Type", "application/json;charset=utf-8")
  //res.status(404).render('error',{ title:'404' })
  next()
})

app.use('/', indexRouter)
app.use('/users', usersRouter)

// catch 404 and forward to error handler
app.use(function( err, res, next ) {
  next(createError(404))
});

// error handler
app.use(function(err , req , res , next ) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})


//错误处理
// app.use(logErrors)
// app.use(clientErrorHandler)
// app.use(errorHandler)
// function logErrors(err, req, res, next) {
//   console.error(err.stack);
//   next(err);
// }

// function clientErrorHandler(err, req, res, next) {
//   if (req.xhr) {
//     res.status(500).send({ error: 'Something failed!' });
//   } else {
//     next(err);
//   }
// }

// function errorHandler(err, req, res, next) {
//   res.status(500);
//   res.render('error', { error: err });
// }

module.exports = app
