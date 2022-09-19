let Parser = require('rss-parser');
var stringSimilarity = require("string-similarity");
const db = require('./db.js');
const dbworker = new db.dbworker();
let parser = new Parser();
const logman = require('./logs.js');
var sentnews = dbworker.getsentnews()
var titles = [];
var link = [];
var picurl = [];

function getrss(){
 titles = [];
 link = [];
 picurl = [];
    (async () => {
        let flag = false
        sentnews = dbworker.getsentnews()
        let feed = await parser.parseURL('https://spb-pansion.mil.ru/more/Novosti/rss');
        //console.dir(feed.title);
      
        feed.items.forEach(item => {
          titles.push(item.title)
          link.push(item.link)
          picurl.push(item.enclosure.url)
          
        });
        sentnews.forEach(newscont => {
            var matches = stringSimilarity.findBestMatch(newscont.head, titles);
           // console.log(matches.bestMatch.rating);
            if (matches.bestMatch.rating > 0.8) {
                dbworker.updatestat(newscont.id,5);
                dbworker.setstat(5,0,newscont.id,-2) 
            if (matches.bestMatch.rating == 1) {
                dbworker.updatestat(newscont.id,4);
                dbworker.setstat(4,0,newscont.id,-2) 
            }
            logman.log("Опубликовали новость №",newscont.id)
            logman.log("Совпадение заголовка",Math.round(matches.bestMatch.rating))
            dbworker.updatelink(newscont.id,link[matches.bestMatchIndex])
            dbworker.updateshead(newscont.id,matches.bestMatch.target)
            flag = true;
        }
           // console.dir(newscont.id +" " +matches.bestMatch.rating)
        });
        //if(flag) 
       // logman.log("Выполнена проверка")
      })();

}

setInterval(getrss,10000)

//console.dir(sentnews)
