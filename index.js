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

//const publish = require('./vendor/publish.js');
//const dbworker = new db.dbworker();

const test = require('./vendor/test.js');
const mail = require('./vendor/smail.js');
const dox = require('./vendor/dox.js');
const doxworker = new dox.doxwork();

const db = require('./vendor/db.js');
const dbworker = new db.dbworker();      

const ortog = require('./vendor/orthog.js');

const newsclv = require('./vendor/newsm.js');
const { json } = require('express');
var appDir = path.dirname(require.main.filename);
const news_path = path.join(appDir,'public/news');
const TEMPFOLDER = path.join(appDir,'public/news/temp');
var PORT = process.env.PORT || 80; 
const app = express();
var i_count = 1
const hbs = exphbs.create({
defaultLayout: 'main',
extname: 'hbs',
helpers: {
  OK: function(){
    i_count = 1
  },
  I_C: function (opts){
    let anso = ''
    for (let i = 0; i < i_count; i++) {
      anso = anso + "I"
    }
    i_count++
    return anso
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
  if (page!='/auth' && page!='/data' && page!='/download'){
    if (!auth && ipinfo!=12){ //Я ИСКЛЮЧЕНИЕ
      if (page!='/') {
        res.redirect("/")
      } else
      res.render('auth',{
        title: 'Кадетский взгляд',
      });
    } else {
      next();
      }
  } else next();
});
app.get('/',(req,res)=>{
  let news_resul
  let statusarr=[0,0,0,0,0,0]
//logman.log('Cookies: ', req.cookies)
//logman.log('Signed Cookies: ', req.signedCookies)
try {
   news_resul = dbworker.getallnews();
  news_resul.forEach(element => {
   // console.dir(element.head)
    element.head = element.head.toLowerCase()
    element.head = element.head.replace(/санкт-петербург.*?\s|Воспитан.*?\s|пансион.*?\s|\A\D\s|^В/gmi, '');
    element.head = element.head.replace(/[.,\/#!$%\^&\*;:{}=\_`~()"'?`<>«»]/gi,'');
    element.head = element.head.replace(/\s{2,}/gm,' ');
    element.head = element.head.replace(/^[ \s]+|[ \s]+$/gm,'');
    element.head = ucFirst(element.head)
   // console.dir(element.head)
    if (element.head.length>25){
      element.head = element.head.substring(0,25) + "..."
    }
    if (element.comment == null || element.comment =='' || element.comment == 'undefined') {//
      element.comment = 'Замечаний нет';
    } else{
      if (element.comment.length>40){
        element.comment = element.comment.substring(0,40) + "..."
      }

    }
    //element.status = dbworker.getstat(0,element.id)
    statusarr[element.status]++;
    element.status = getstatus(element.status)

  let datecreate = new Date(element.date*1000);
  let datemp = new Date(element.mpdate*1000);
  element.date = `${curdate(datecreate.getDate())}.${curdate(datecreate.getMonth()+1)} ${curdate(datecreate.getHours())}:${curdate(datecreate.getMinutes())}:${curdate(datecreate.getSeconds())}`;
  element.mpdate = `${curdate(datemp.getDate())}.${curdate(datemp.getMonth()+1)}`
  });  
} catch (error) {
  logman.log('Ошибка в 109 строке:',error);
}
  res.render('index',{
    title: 'Кадетский взгляд',
    auth: auth,
    stat: statusarr,
    content: news_resul   
  });

})
app.get('/form',(req,res)=>{
  res.render('form',{
    title: 'TEST',
    auth: auth,
    //stat: statusarr,
    //content: news_resul   
  });
}) 
app.get('/test',(req,res)=>{
  let news_resul
  let statusarr=[0,0,0,0,0,0]
  try {
    news_resul = dbworker.getallnews();
   news_resul.forEach(element => {
    // element.head = element.head.replace(/санкт-петербург.*?\s|Воспитан.*?\s|пансион.*?\s|\A\D\s|^В/gmi, '');
     if (element.head.length>250){
       element.head = element.head.substring(0,25) + "..."
     }
     if (element.comment == null || element.comment =='' || element.comment == 'undefined') {//
       element.comment = 'Замечаний нет';
     } else{
       if (element.comment.length>40){
         element.comment = element.comment.substring(0,40) + "..."
       }
 
     }
     statusarr[element.status]++;
     element.status = getstatus(element.status)
     
   let datecreate = new Date(element.date*1000);
   let datemp = new Date(element.mpdate*1000);
   element.date = `${curdate(datecreate.getDate())}.${curdate(datecreate.getMonth()+1)} ${curdate(datecreate.getHours())}:${curdate(datecreate.getMinutes())}:${curdate(datecreate.getSeconds())}`;
   element.mpdate = `${curdate(datemp.getDate())}.${curdate(datemp.getMonth()+1)}`
   });  
 } catch (error) {
   logman.log('Ошибка в 147 строке:'+error);
 }
  res.render('test',{
    title: 'Кадетский взгляд',
    auth: auth,
    stat: statusarr,
    content: news_resul   
  });
})
app.get('/send',(req,res)=>{
  if (usrinfo.role>2) {
    let news_f = path.join(news_path,'/new');
    let sent_f = path.join(news_path,'/sent')
    logman.log(news_f,sent_f);
    //logman.log(fs.ensureDirSync(sent_f))
   // logman.log(fs.ensureDirSync(news_f))
   let f = makezip(news_f,sent_f)
   if (f!=false){res.sendFile(f);}
   else res.send('Нет новостей для отправки');
   // res.send('ok');
  } else{
    res.send('Недостаточно прав');
  }

})
app.get('/data',(req,res)=>{
  //dbworker.updatescreenip(ipinfo.id,req.query.width,req.query.height,req.query.dtype,req.session.id)
  dbworker.updateautnerinfo(req.session.id,req.query.width,req.query.height,req.query.dtype,getcurip(req.socket.remoteAddress))
 // logman.log("Информация о клиенте:",req.query)
  res.send('ok');
})
app.get('/download',(req,res)=>{
  if (req.query.down) {
    res.render('download',{
      title: 'Загрузка',
      uname: usrinfo.name,
      auth: auth,
      filename:req.query.down    
    });
  } else{
    res.send('Ошибка! Такого архива нет! Пожалуйста, свяжитесь!')
  }

})
app.get('/newmat',(req,res)=>{
  res.render('newmat',{
    title: 'Добавить документ',
    uname: usrinfo.name,
    auth: auth      
  });
})
app.get('/errsay',(req,res)=>{
  res.render('errsay',{
    title: 'Сообщить об ошибке',
    uname:usrinfo.name,
    auth: auth      
  });
})
app.get('/manual',(req,res)=>{
  res.render('manual',{
    title: 'Инструкция',
    uname:usrinfo.name,
    auth: auth      
  });
})
app.get('/new',(req,res)=>{
  res.render('new',{
    title: 'Создание новости',
    uname:usrinfo.name,
    auth: auth      
  });
})
app.get('/check',(req,res)=>{
 ortog.test(res,req.query.text)
//logman.log(result);
/*if (typeof result != "undefined"){
  res.send({"result":req.query.text});
} else res.send({"result":"ok"});*/
})
app.get('/stat',(req,res)=>{
  let statusarr=[0,0,0,0,0,0]
  news_resul = dbworker.getallnews();
  let leaders = dbworker.getleadersnews()
  news_resul.forEach(element => {
     statusarr[element.status]++;
   })
  let datecreate = new Date();
  let info = {
     daten : `${curdate(datecreate.getDate())}.${curdate(datecreate.getUTCMonth()+1)}`,
     dwer : getNumberOfDays('9/9/2022'),
     statusarr: statusarr,
     allnews : news_resul.length,
     new:statusarr[0], toed:statusarr[1], tos:statusarr[2], sent: statusarr[3],
     publ: statusarr[4], err:statusarr[5],
     leader:leaders
  }
  console.dir(info)
  res.render('stat',{
    title: 'Статистика',
    uname:usrinfo.name,
    auth: auth,
    info: info      
  });
})
app.get('/edit',(req,res)=>{
 logman.log(usrinfo.name + ' редактирует новость №'+req.query.idn);
 var results = dbworker.getnews(req.query.idn);
 if (results==undefined) {
  res.render('404',{
    title: 'Новости с таким ID нет',
    auth: auth,
  });
  return 0;
}else {
  logman.log('ПУТЬ FS', results.path)
  var del_path = path.join(path.dirname(require.main.filename),'public');
  results.path = results.path.replace(del_path, '');
  results.path = results.path.replace(/["]/gi, '');
  logman.log('ПУТЬ WEB', results.path)
  let resuls = dbworker.getpic(req.query.idn)
    //logman.log(resuls);
    //results.pictures = 'JSON.parse(results.pictures)'
    results.pictures = resuls
    for (let j = 0; j < results.pictures.length; j++) {
      results.pictures[j] = `${results.path}\\${results.pictures[j].pict}` ;
   }
   let datecreate = new Date(results.date*1000);
   let datemp = new Date(results.mpdate*1000);
   results.date = `${curdate(datecreate.getDate())}.${curdate(datecreate.getMonth()+1)} ${curdate(datecreate.getHours())}:${curdate(datecreate.getMinutes())}:${curdate(datecreate.getSeconds())}`;
   results.mpdate = `${curdate(datemp.getDate())}.${curdate(datemp.getMonth()+1)}`
 
   res.render('edit',{
     title: 'Редактирование новости',
     auth: auth,
     content: results,
     path : results.path     
   });
  logman.log('Ее статус: ', results.status);
 }
})
app.get('/t',(req,res)=>{
  res.sendFile(__dirname + "/public/news/sent/06.08 news.zip");
  
 // res.send('ok')
 })
app.get('/noerr',(req,res)=>{
  logman.log(usrinfo.name,'В новости №',req.query.idn,'нет ошибки');
  dbworker.updatestat(req.query.idn,4);
  dbworker.setstat(4,0,req.query.idn,usrinfo.id) 
  res.redirect("/")
 // res.send('ok')
 })
app.get('/show',(req,res)=>{
  let iserr = false;
  logman.log(usrinfo.name,'смотрит новость №'+req.query.idn);
  var results = dbworker.getnews(req.query.idn);
  if (results==undefined) {
   res.render('404',{
     title: 'Новости с таким ID нет',
     auth: auth,
   });
   return 0;
 }else {
   logman.log('ПУТЬ FS', results.path)
   var del_path = path.join(path.dirname(require.main.filename),'public');
   results.path = results.path.replace(del_path, '');
   results.path = results.path.replace(/["]/gi, '');
   logman.log('ПУТЬ WEB', results.path)
   let resuls = dbworker.getpic(req.query.idn)
     //logman.log(resuls);
     //results.pictures = 'JSON.parse(results.pictures)'
     results.pictures = resuls
     for (let j = 0; j < results.pictures.length; j++) {
       results.pictures[j] = `${results.path}\\${results.pictures[j].pict}` ;
    }
    let datecreate = new Date(results.date*1000);
    let datemp = new Date(results.mpdate*1000);
    results.date = `${curdate(datecreate.getDate())}.${curdate(datecreate.getMonth()+1)} ${curdate(datecreate.getHours())}:${curdate(datecreate.getMinutes())}:${curdate(datecreate.getSeconds())}`;
    results.mpdate = `${curdate(datemp.getDate())}.${curdate(datemp.getMonth()+1)}`
    if (req.query.err) {
      logman.log(usrinfo.name,"Смотрит новость с ошибкой на сайте")
      iserr = true;
    }
    res.render('show',{
      title: 'Редактирование новости',
      auth: auth,
      content: results,
      path : results.path,
      iserr: iserr     
    });
   logman.log('Ее статус: ', results.status);
  }
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

function getadmin(str){
  switch (str) {
    case "v.diakonov":
      return 3
    break;
    case "e.grishina":
      return 2
    break;
  }
  return 1
}
function isAuth(req){
  if (usrinfo!=false){
    return usrinfo.role;
  } else 
    return false; // ПЕРЕПИШИ
  }
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
app.post('/adddoc', async function(req, res) {
  console.dir(req.body)
  console.dir(req.files)

  res.redirect('/');
  //logman.log(main_pic.mimetype); //Переадресация на главную
  //res.render('index',{title: 'Главная'});
});
app.post('/upload', async function(req, res) {
  console.dir(req.body)
  res.redirect('/');
  //logman.log(main_pic.mimetype); //Переадресация на главную
  //res.render('index',{title: 'Главная'});
});
app.post('/edit', function(req, res) {
  let main_for_del = false
  let Edited = new newsclv.newscl(req.query.idn);
  logman.log(usrinfo.name,'изменил новость №', req.query.idn);
  let news_npath = Edited.news_path_n;
  logman.log('Путь к новости из БД:', news_npath);
  //logman.log(req.body); // ID database update
  logman.log('фОТО К УДАЛЕНИЮ: ',req.body.picfordel);
  if (req.body.picfordel!=undefined){Edited.delpicture(req.body.picfordel)}
  let pictures_name =[];

  if (!req.files || Object.keys(req.files).length === 0) {
    req.files = {}
  }
  if (req.files.mainpic!=undefined){
    let maindb = dbworker.getmainpic(req.query.idn)
    if (maindb!=false){
      main_for_del = maindb
      Edited.del(Edited.news_path_n,'main',maindb)
      logman.log("Удалил заставку из Файловой системы ",main_for_del)
    }

  }
  let main_p = download(news_npath,req.files.mainpic,true);
  let allphotoarr = download(news_npath,req.files.newsimg);
  if (main_p!=false) {
   logman.log(usrinfo.name,'при редактировании поменял заставку');
   //pictures_name = pictures_name.concat(main_p);
   dbworker.updatepict(req.query.idn,main_for_del,main_p)
   logman.log("Заменил заставку в Базе",req.query.idn,main_for_del,main_p)
  } else{
   logman.log(usrinfo.name,'при редактировании не менял заставку');
  }
  
 if (allphotoarr!=false) {
  logman.log(usrinfo.name,'при редактировании добавил фото');
   pictures_name = pictures_name.concat(allphotoarr);
 } else logman.log(usrinfo.name,'при редактировании не добавил фото') 

 logman.log("Пришло с формы",req.body.statusch)

  dbworker.updatecomm(req.query.idn,req.body.new_comm);

  dbworker.updatestat(req.query.idn,getnumstat(req.body.statusch));
  dbworker.setstat(getnumstat(req.body.statusch),0,req.query.idn,usrinfo.id) 
  Edited.head = req.body.new_head
  Edited.cont = req.body.new_text
  Edited.autor = req.body.new_auth
  Edited.mpunixtime = Edited.getmpunixtime(req.body.new_date)
  Edited.mpdate = req.body.new_date
  logman.log("Дата с формы",req.body.new_date)
  Edited.pictures = pictures_name
  logman.log('Имя новых фоток? :',pictures_name);
  //Edited.status = 0
  Edited.save(1)
//  dbworker.addipname(ipinfo.ip,req.body.new_auth)
  //Edited.setsended(5)
  res.redirect('/');
})

app.get('*', function(req, res){
  res.render('404', { 
    url: req.url,
    title: '404 Not Found',   
  });
});
//console.log(JSON.stringify(`F:/news/public/news/new/28.08  тестква`.replace(/\/new\//g,"/sent/")));
function makezip(news_f,sent_f){
  let flg = false
  var AdmZip = require("adm-zip");
  var zip = new AdmZip();
  var folders = dbworker.getsendfolder()
  let fold
  for (let i = 0; i < folders.rows.length; i++) {
    fold = path.join(folders.rows[i].path).replace(/["]/gi,"");
    let arr = fold.split('\\');
    logman.log(fold);
    zip.addLocalFolder(fold,arr[arr.length-1])
    logman.log(fs.copySync(fold, path.join(sent_f,arr[arr.length-1]), { overwrite: true }))
    logman.log(fs.removeSync(fold))
    dbworker.updatestat(folders.rows[i].id,3)
    dbworker.newssetfold(folders.rows[i].id,JSON.stringify(fold.replace(/\\new\\/g,"\\sent\\")))
    flg = true
  }
  var willSendthis = zip.toBuffer();
  // or write everything to /disk
  let datecreate = new Date();
  let zipname = `${curdate(datecreate.getDate())}.${curdate(datecreate.getMonth())}-${curdate(datecreate.getHours())}-${curdate(datecreate.getMinutes())}-${curdate(datecreate.getSeconds())}-news.zip`
  let zips_folder = path.join(path.join(news_path,'/zips'),zipname)
  zip.writeZip(zips_folder);
  mail.sendmail(zipname)
  if (flg) {return zips_folder}
  else return false
}
function getformat(name){
  let arr = name.split('.');
  return arr[arr.length-1]
}
function checkfilesys() {
  fs.ensureDir(news_path, err => {
    if (err)
    logman.log('Ошибка в папке новостей:',err) // => null
    // Добавить проверку папок new,sent
  })
}
function download(news_npath,photos=null,main=false) {
  //var old =''
  let datecreate = new Date();
  let nowt = `${curdate(datecreate.getDate())}.${curdate(datecreate.getMonth())} ${curdate(datecreate.getHours())}-${curdate(datecreate.getMinutes())}-${curdate(datecreate.getSeconds())}`
  let pictures_name = []
  if (photos!=null){
      if (Array.isArray(photos)){
        photos.forEach(element => {
          element.mv(path.join(news_npath,element.name), function(err) {
            if (err) 
              //return res.status(500).send(err); 
              logman.log('Ошибка 500 в',news_npath,element.name)
              logman.log(err);
              return false
            
            });
            pictures_name.push(path.join(element.name))
        });
      } else{
        logman.log('Одно фото')
          if (main){
            //old = photos.name
            photos.name = `main.${getformat(photos.name)}`;
            logman.log("Загрузка заставки? ",main)
          }
          photos.mv(path.join(news_npath,photos.name), function(err) {
            if (err)
              //return false; 
              logman.log('Ошибка 500 в Фотках',news_npath,photos.name)      
              logman.log(err);     
              return false; 
            });
          pictures_name.push(photos.name)
      } 
  logman.log("Загружены фотки",pictures_name)
  pictures_name.forEach(el => {
    try {
      fs.copySync(path.join(news_npath,el), path.join(TEMPFOLDER,`${nowt} ${usrinfo.name} ${el}`))
    } catch (error) {
      console.dir(error)
    }
  });
  } else return false
return pictures_name
}

function curdate(minute){
  minute = (minute < 10) ? '0' + minute : minute;
  return minute;
}

function getnumstat(par) {
  logman.log("Статус пришел с формы",typeof par);
  if (par!=undefined) {
    if (par=='true') {
      return 2
    } else return 1
  }
  return 0
}
function ucFirst(str) {
  if (!str) return str;

  return str[0].toUpperCase() + str.slice(1);
}
function getstatus(num) {
  let ans = [
    'Ожидает утверждения',
    'Требует исправления!',
    'Утверждено! Ожидает отправку',
    'Отправлено',
    'На сайте',
    'На сайте! ОШИБКА в содержании!!!'
  ]
  return ans[num]
}
async function start(){
    try {
      checkfilesys()
        app.listen(PORT,()=> {
          logman.log('Сервер Голосования - запущен')
          logman.log('Порт:',PORT);
        })
    } catch (e) {
        logman.log(e);
    }
}
function getcurip(str) {
  let arr = str.split(':');
  arr = arr[arr.length-1];
  return arr;
}
function getNumberOfDays(start) {
  const date1 = new Date(start);
  const date2 = new Date();

  // One day in milliseconds
  const oneDay = 1000 * 60 * 60 * 24;

  // Calculating the time difference between two dates
  const diffInTime = date2.getTime() - date1.getTime();

  // Calculating the no. of days between two dates
  const diffInDays = Math.round(diffInTime / oneDay);

  return diffInDays;
}

start();