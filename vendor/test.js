const db = require('./db.js');
const dbworker = new db.dbworker();
let tycfd = ['sdf','pic1', 'pic2','pic3','pic4','pic5']
//let ans = dbworker.addnews('head','cont','autor',0,12,21,tycfd,'path')
//let ans = dbworker.updatenews(210,'this.head','this.cont','this.autor',1,12,'this.news_path_n')
//console.log(ans);
let pathwo = require('path');
let fs = require('fs-extra')

//deldocx('F:/news/public/news/new/01.07 участие подготовке международного фестиваля цветов')

/*let ans = dbworker.setstat(2,0,2,1)
let ans = dbworker.getstat(0,2)
console.dir(ans.status)
*/
//В Пансионе воспитанниц состоялась читательская конференция
//console.dir(dbworker.getusr('VasyaLG'))
//console.dir(dbworker.adduser('VasyaLG',"sdfsd sf sdf ").rows.insertId)
//console.dir(dbworker.sesscreate("sdfsdfsdf","19s91s9df19"))
//console.dir(dbworker.getusr('VasyaLG'))
//console.dir(dbworker.getusr('VasyaLG'))
//console.dir(dbworker.getleadersnews())
//console.dir(dbworker.updateautnerinfo('VasyaLG',123,123,'dtype','ip'))
//console.dir(dbworker.fixpict())