const logman = require('./vendor/logs.js');
process.on('uncaughtException', (err) => {
  logman.log('Глобальный косяк приложения!!! ', err.stack);
}); //Если все пошло по пизде, спасет ситуацию
const express = require('express');
const exphbs = require('express-handlebars');
const fileUpload = require('express-fileupload');
const session = require('express-session');
var cookieParser = require('cookie-parser');
var unixTime = require('unix-time');
const path = require('path');
const fs = require('fs-extra');


const db = require('./vendor/db.js');
const dbworker = new db.dbworker();      
//dbworker.sesscreate("555")
const { json } = require('express');
var appDir = path.dirname(require.main.filename);
const news_path = path.join(appDir,'public/news');
const TEMPFOLDER = path.join(appDir,'public/news/temp');
var PORT = process.env.PORT || 505; 
const app = express();
var i_count = 1
const hbs = exphbs.create({
defaultLayout: 'main',
extname: 'hbs',
helpers: {
  OK: function(){
    i_count = 1
  },
  SH_L:function (opts){
    if (i_count<11) {
      i_count++
      return "Short List"
    } else{
      return ''
    }
  },
  I_C: function (opts){
    let anso = ''
    for (let i = 0; i < i_count; i++) {
      anso = anso + "I"
    }
    if (i_count<4) {
      i_count++
      return anso + " место"
    } else{
      return ''
    }
    
  },
  if_m: function (a,opts) {
    if (a % 2 == 0 && a!=0){ // Or === depending on your needs
       // logman.log(opts);
        return opts.fn(this);
     } else
        return opts.inverse(this);
},
if_a: function (a, opts) {
  if (typeof a == 'number'){ // Or === depending on your needs
     // logman.log(opts);
      return opts.fn(this);
   } else
      return opts.inverse(this);
},
if_j: function () {
  let ans = false;
  
  for (var i = 1; i < arguments.length; i++) {
    if (arguments[0]==arguments[i]) {
     // console.dir(arguments[0]==arguments[i])
      return arguments[arguments.length-1].fn(this);
    }
  }
  return arguments[arguments.length-1].inverse(this);
},
  if_eq: function (a, b, opts) {
      if (a == b){ // Or === depending on your needs
         // logman.log(opts);
          return opts.fn(this);
       } else
          return opts.inverse(this);
  },
  if_more: function (a, b, opts) {
    if (a >= b){ // Or === depending on your needs
       // logman.log(opts);
        return opts.fn(this);
     } else
        return opts.inverse(this);
}
}
});

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views','views');
app.use(express.static(path.join(__dirname, 'public')));

app.use(cookieParser());
//app.use(fileUpload());
app.use(session({resave:false,saveUninitialized:false, secret: 'keyboard cat', cookie: {  }}))
app.use(fileUpload({
  useTempFiles : true,
  tempFileDir : TEMPFOLDER,
  defCharset: 'utf8',
  defParamCharset: 'utf8'
}));
var auth = false;
var usrinfo = false;
var autinfo = false;
app.use(function (req, res, next) {
   autinfo = dbworker.getautinfo(req.session.id);
   req.session.as = false
  let page = req._parsedOriginalUrl.pathname;
  if (page!='/data') {  
   //logman.log(req._parsedOriginalUrl.pathname  );
   try {
    if(autinfo!=false){
      if (autinfo.nameid != -1){
          //console.log(autinfo.nameid);
          usrinfo = dbworker.usrbyid(autinfo.nameid);
      } else{
        logman.log("Не авторизован!")
        usrinfo = false;
      }
    } else{
      usrinfo = false;
      logman.log("Первый раз")
    }
   } catch (error) {
    console.dir(error);
   }
   var ipinfo = getcurip(req.socket.remoteAddress)
   auth = isAuth(req);
    logman.log(`На ${page }\n IP: ${ipinfo} \n Имя: ${usrinfo.name} \n Auth: ${auth}`);
  }
  if (page!='/auth' && page!='/data' && page!='/download' && page!='/rep'){
    if (auth===false && ipinfo!=122){ //Я ИСКЛЮЧЕНИЕ
      if (page!='/') {
        res.redirect("/")
      } else{
        res.render('auth',{
          title: 'Кадетский взгляд',
        });
      }

    } else {
      next();
      }
  } else next();
});
app.get('/',(req,res)=>{
  let news_resul
  logman.log(usrinfo.name + ' зашел на страницу '+usrinfo.role);
  try {
    news_resul = dbworker.getfilms(usrinfo.role);
  if (news_resul==undefined) {
   res.render('404',{
     title: 'Ссылка недействительна',
     auth: auth,
   });
   return 0;
 }else {
  news_resul.forEach(element => {
    element.type = getfilm(element.type)
  }); 
  } 
} catch (error) {
  logman.log('Ошибка в 141 строке:',error);
}
  res.render('index',{
    title: 'Кадетский взгляд',
    auth: auth,
    usr: usrinfo.id,
    content: news_resul   
  });

})
app.get('/form',(req,res)=>{
  let film
  let flag = 0
try {
  film = dbworker.getfilm(req.query.filmid);
  film[0].typen = getfilm(film[0].type)
} catch (error) {
  logman.log('Ошибка в 109 строке:',error);
}
  try {
   var vres = dbworker.getvoteusr(autinfo.nameid,req.query.filmid)
   console.dir(vres)
   if (vres!=undefined) {
    console.dir(vres)
    flag = 1
  }
  } catch (error) {
    logman.log(error)
  }
  res.render('form',{
    title: 'Голосование',
    auth: auth,
    film: film,
    user: autinfo.nameid,
    flag:flag,
    vres:vres
  });
}) 
app.get('/pers',(req,res)=>{
  console.dir(req.query)
  logman.log(usrinfo.name,'смотрит персональный протокол '+req.query.userid);
  //http://localhost/pers?userid=1
  var user_info = dbworker.usrbyid(req.query.userid)
 var results = dbworker.getuservoice(user_info.role,req.query.userid);
 
 //console.dir(results)

  if (results==undefined) {
   res.render('404',{
     title: 'C таким ID нет',
     auth: auth,
   });
   return 0;
 }else {
    res.render('show',{
      title: 'Результаты',
      auth: auth,
      content: results,
      type:user_info.role,
      nom: getfilm(user_info.role),
      user: user_info
    });
   
  }
 })
 app.get('/itog',(req,res)=>{
 // console.dir(req.query)
  logman.log(usrinfo.name,'смотрит итоговый протокол '+ getfilm(req.query.id));
  //http://localhost/itog?id=1
  //var user_info = dbworker.usrbyid(req.query.userid)
  try {
    var results = dbworker.gettyperes(req.query.id);
    if (results==undefined) {
      res.render('404',{
        title: 'C таким ID нет',
        auth: auth,
      });
      return 0;
    } else {
      let id = 0
      results.forEach(element =>{
       element.id = ++id
       element.itog = element.janr+element.dram+element.actu+element.orig+element.soder+element.hyd+element.tex+element.vira
       // element.itogs = Math.round(element.itogs)
        element.itogs = element.itogs.toFixed(2)
       // console.log(element.itog)
     })
       res.render('itog',{
         title: 'Результаты',
         auth: auth,
         content: results,
         type:req.query.id,
         nom: getfilm(req.query.id),
       });
      
     }

  } catch (error) {
    
  }

 

 })
app.get('/test',(req,res)=>{
  let ans = []
 try {
  let voted = dbworker.getvoted(req.query.id)
  console.dir(voted)
  voted.forEach(el =>{
    ans.push(el.filmid)
  })
 } catch (error) {
  console.dir(error)
 }
 console.dir(JSON.stringify(ans))
 res.send(JSON.stringify(ans))
})
app.get('/rep',(req,res)=>{
 try {
  var voted = dbworker.getusersrep()
  console.dir(voted)
  voted.forEach(el =>{
    el.role = getfilm(el.role)
    let datecreate = new Date(el.lastseen*1000);
    el.lastseen= `${curdate(datecreate.getDate())}.${curdate(datecreate.getMonth()+1)} ${curdate(datecreate.getHours())}:${curdate(datecreate.getMinutes())}:${curdate(datecreate.getSeconds())}`;
  
  })
 } catch (error) {
  console.dir(error)
 }
 res.send(voted)
})
app.get('/alli',(req,res)=>{
  let users = dbworker.getallitogs()
  users.forEach(e =>{
    e.type = getfilm(e.type)
  })
  res.render('allitg',{
    title: 'Места',
    content:users,
    auth: auth      
  });
})
app.get('/voted',(req,res)=>{
  let users = dbworker.getres()
  users.forEach(e =>{
    e.type = getfilm(e.type)
    let datecreate = new Date(e.time*1000);
    e.time= `${curdate(datecreate.getDate())}.${curdate(datecreate.getMonth()+1)} ${curdate(datecreate.getHours())}:${curdate(datecreate.getMinutes())}:${curdate(datecreate.getSeconds())}`;
  })
  res.render('voted',{
    title: 'История голосов',
    content:users,
    auth: auth      
  });
})
app.get('/resul',(req,res)=>{
  let users = dbworker.getallusers()
  users.forEach(e =>{
    e.role = getfilm(e.role)
  })
  res.render('users',{
    title: 'Эксперты',
    content:users,
    auth: auth      
  });
})
app.get('/data',(req,res)=>{
  //dbworker.updatescreenip(ipinfo.id,req.query.width,req.query.height,req.query.dtype,req.session.id)
  dbworker.updateautnerinfo(req.session.id,req.query.width,req.query.height,req.query.dtype,getcurip(req.socket.remoteAddress))
 // logman.log("Информация о клиенте:",req.query)
  res.send('ok');
})

app.get('/manual',(req,res)=>{
  res.render('manual',{
    title: 'Инструкция',
    uname:usrinfo.name,
    auth: auth      
  });
})

app.get('/auth', function(req, res) {
  logman.log('На сервер пришел пароль: '+req.query.pass);
  let user = dbworker.getusr(req.query.pass)
  if (user!=false){
    //usrinfo
    dbworker.updatename(user.id,req.session.id)
    req.session.auth = user.role;
    res.send('ok');
    return true;
  } else {
    if (req.query.pass!=undefined) {
      logman.log('Пользователя:',req.query.pass,'нет в системе');
      req.session.auth = false;
      res.send('nok'); 
    } else{
      logman.log('Зашел на страницу auth, отправлен на главную')
      req.session.auth = false;
      res.redirect("/")
      //res.send('nok');
    }
  }

})

app.get('/logout', function(req, res) {
logman.log(usrinfo.name,"вышел из системы");
req.session.auth = null;
req.session.as = null;
//res.send('ok');
console.dir(req.session)
req.session.save(function (err) {
  if (err) next(err)

  // regenerate the session, which is good practice to help
  // guard against forms of session fixation
  req.session.regenerate(function (err) {
    if (err) next(err)
    res.redirect('/')
  })
})
})

app.post('/upload', async function(req, res) {
  console.dir(req.body)
  logman.log(usrinfo.name,'проголосовал',req.body); 
  let idvote = dbworker.addvote(req.body.userid,req.body.filmid,unixTime(new Date())).insertId
  console.dir(idvote)
  try {
    if (req.body.janr!=undefined){
      dbworker.updatevotepar(idvote,`janr`,req.body.janr)
    }
  } catch (error) {
    logman.log(error,'janr не пришел')
  }
  try {
    if (req.body.dram!=undefined){
    dbworker.updatevotepar(idvote,`dram`,req.body.dram)}
  } catch (error) {
    logman.log(error,'dram не пришел')
  }
  try {
    if (req.body.actu!=undefined){
    dbworker.updatevotepar(idvote,`actu`,req.body.actu)}
  } catch (error) {
    logman.log(error,'actu не пришел')
  }
  try {
    if (req.body.orig!=undefined){
    dbworker.updatevotepar(idvote,`orig`,req.body.orig)}
  } catch (error) {
    logman.log(error,'orig не пришел')
  }
  try {
    if (req.body.soder!=undefined){
    dbworker.updatevotepar(idvote,`soder`,req.body.soder)}
  } catch (error) {
    logman.log(error,'soder не пришел')
  }
  try {
    if (req.body.hyd!=undefined){
    dbworker.updatevotepar(idvote,`hyd`,req.body.hyd)}
  } catch (error) {
    logman.log(error,'hyd не пришел')
  }
  try {
    if (req.body.tex!=undefined){
    dbworker.updatevotepar(idvote,`tex`,req.body.tex)}
  } catch (error) {
    logman.log(error,'tex не пришел')
  }
  try {
    if (req.body.vira!=undefined){
    dbworker.updatevotepar(idvote,`vira`,req.body.vira)}
  } catch (error) {
    logman.log(error,'vira не пришел')
  }
  res.redirect('/');
});

app.get('*', function(req, res){
  res.render('404', { 
    url: req.url,
    title: '404 Not Found',   
  });
});

function isAuth(req){
  if (usrinfo!=false){
    return usrinfo.role;
  } else 
    return false; // ПЕРЕПИШИ
  }
function getformat(name){
  let arr = name.split('.');
  return arr[arr.length-1]
}

function curdate(minute){
  minute = (minute < 10) ? '0' + minute : minute;
  return minute;
}

function ucFirst(str) {
  if (!str) return str;
  return str[0].toUpperCase() + str.slice(1);
}

function getfilm(num) {
  let ans = [
    'Игровой короткометражный фильм',
    'Документальный фильм',
    'Научно-популярный фильм',
    'Анимационный фильм',
    'Социальный/рекламный ролик',
    'Музыкальный видеоклип',
    'Игровой короткометражный фильм - Short list',
  ]
  ans[55] = "Администратор"
  return ans[num]
}
async function start(){
    try {
        app.listen(PORT,()=> {
          logman.log('Сервер Голосования - запущен')
          logman.log('Порт:',PORT);
        })
    } catch (e) {
        logman.log(e);
    }
}
function getcurip(str) {
  let arr = []
  try {
     arr = str.split(':');
    arr = arr[arr.length-1];
  } catch (error) {
    console.log(error)
  }

  return arr;
}

start();