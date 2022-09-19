module.exports.newscl = class newscl{

    constructor (id){
    this.id = id
    this.db = require('./db.js');
    this.dox = require('./dox.js');
    this.logman = require('./logs.js');
    this.fs = require('fs-extra');   
    this.pathmod = require('path');
    var appDir = this.pathmod.dirname(require.main.filename);
    this.news_path = this.pathmod.join(appDir,'public/news');
    this.unixTime = require('unix-time');
    this.move = require('fs-move');

    if (this.id==undefined) {
        this.logman.log('Создание новости');
    } else {
        const dbworker = new this.db.dbworker(); 
        let results = dbworker.getnews(this.id);
        this.head = results.head
        this.cont = results.cont
        this.autor = results.autor
        this.status = results.status
        this.mpunixtime = results.mpdate
        this.date = results.date
        this.pictures = results.pictures
        this.news_path_n = this.curpath(results.path)
    }
    
    //addnews(head,cont,autor,status,mpdate,date,pictures,path)
   // addpict(newsid,pic)
   } 

   curpath(cpath){
    cpath = cpath.replace(/["]/gi, '');
        return cpath
   }

    getname(dat,str) {
    dat = dat.split(' ').join('.');
    this.newsname = str.toLowerCase();
    this.newsname = this.newsname.replace(/санкт-петербург.*?\s|Воспитан.*?\s|пансион.*?\s|\A\D\s|^В/gmi, '');
    this.newsname = this.newsname.replace(/[.,\/#!$%\^&\*;:{}=\_`~()"'?`<>«»]/gi,'');
    this.newsname = this.newsname.replace(/\s{2,}/gm,' ');
    this.newsname = this.newsname.replace(/^[ \s]+|[ \s]+$/gm,'');
    this.newsname = this.ucFirst(this.newsname)
    this.newsname= `${dat} ${this.newsname}`
    this.newsname = this.newsname.replace(/\s{2,}/gm,' ');
    this.newsname = this.newsname.replace(/^[ \s]+|[ \s]+$/gm,'');
    return this.newsname
    //this.logman.log(arr);
    }
    ucFirst(str) {
        if (!str) return str;
      
        return str[0].toUpperCase() + str.slice(1);
      }
    getdir(mpdate,head){
        var ndir = this.pathmod.join(this.news_path,'new',this.getname(mpdate,head));
        this.logman.log("Путь к папке",ndir);
        this.fs.ensureDir(ndir)
        return ndir
    }

    getmpunixtime(mpdate){
        let data_arr = mpdate.split(' ');
        let mpunixtime = parseInt((new Date('2022.'+data_arr[1]+'.'+data_arr[0]).getTime() / 1000).toFixed(0))
        if (isNaN(mpunixtime)) {
             data_arr = mpdate.split('.');
             mpunixtime = parseInt((new Date('2022.'+data_arr[1]+'.'+data_arr[0]).getTime() / 1000).toFixed(0))
             if (isNaN(mpunixtime)) {
                log('88 строка новости пришло время',mpdate)
             }
        }
        this.logman.log('UNIX время: '+mpunixtime);
        return mpunixtime
    }

    add(head,cont,autor,status,mpdate,pictures,usrinfo){
    let news_path_n = this.getdir(mpdate,head);
    this.fs.ensureDir(news_path_n, { recursive: true })
    this.head = head
    this.cont = cont
    this.autor = autor
    this.usrinfo = usrinfo
    this.status = status
    this.mpunixtime = this.getmpunixtime(mpdate)
    this.pictures = pictures
    this.logman.log('Путь к новости:'+news_path_n);
    this.news_path_n = news_path_n
    this.mpdate = mpdate
    this.save();
    }

    edit(){
        //Удалить фото
        this.logman.log("СМОТРИ СЮДА",this.pictures);

        const dbworker = new this.db.dbworker();

        this.pictures.forEach(element => {
            this.logman.log("СМОТРИ СЮДА тоже",'\n'+element);
            dbworker.addpict(this.id,element)
            });
            
        this.del(this.news_path_n,'docx')
        this.mpunixtime = this.getmpunixtime(this.mpdate)
        dbworker.updatenews(this.id,this.head,this.cont,this.autor,this.mpunixtime,this.news_path_n)
            
    }

    renamefolder(){
        const dbworker = new this.db.dbworker(); 
        this.logman.log('Старая папка из бд: ' + JSON.parse(this.news_path_n));
        this.fs.renameSync(JSON.parse(this.news_path_n),this.pathmod.join(this.news_path,'new',this.newsname))
        this.logman.log('Новое имя: '+this.pathmod.join(this.news_path,'new',this.newsname));
        this.news_path_n = JSON.stringify(this.pathmod.join(this.news_path,'new',this.newsname));
        dbworker.updatefolder(this.id,this.news_path_n)
    }

    delpicture(picfordel){
        const dbworker = new this.db.dbworker(); 
        picfordel=picfordel.split(',');
        this.logman.log('Имена фоток для удаления из формы:'+picfordel);
        picfordel.forEach(element => {
            element = element.split('\\');
            element = element[element.length-1]
            this.logman.log("Элемент для удаления:",element);
            if (element!='') {
                this.logman.log('Удаляю: '+this.pathmod.join(this.news_path_n,element));
                let does = this.fs.removeSync(this.pathmod.join(this.news_path_n,element))
                dbworker.dellpict(this.id,element);
                this.logman.log('Файл удален: '+element);
            }
        });
        

    }

    save(par){
    const dbworker = new this.db.dbworker();  
    const doxworker = new this.dox.doxwork();
    try {
        this.news_path_n = JSON.stringify(this.news_path_n)
        this.getname(this.mpdate,this.head)
        //this.renamefolder()
        this.logman.log('Редактируют?',par);

        if (par!=undefined) {
            this.renamefolder()
           // this.news_path_n = JSON.stringify(this.news_path_n)
            this.getname(this.mpdate,this.head)
            this.edit()
        } else {
           let newsid = dbworker.addnews(this.head,this.cont,this.autor,this.status,this.mpunixtime,this.unixTime(new Date()),this.pictures,this.news_path_n);
           dbworker.setstat(this.status,0,newsid,this.usrinfo.id) 
            }
            doxworker.addnews(this.newsname, this.head, this.cont ,this.news_path_n); //Заменить первое на имя документа
            this.logman.log('Название:'+this.newsname);
            
    } catch (err) {
        this.logman.log('Ошибка 176 newsm строка: '+err);
        return false;
        }
        
        return true;
    }
    del(dirpath,what,mainname=null) {
        let delans = "Х"
        dirpath = this.curpath(dirpath)
        let filesa = this.fs.readdirSync(dirpath)
        this.logman.log('Файлы в диерктории удаления:'+filesa);
        filesa.forEach(files => {
            let arr = files.split('.');
            if (what=='docx') {
                if (arr[arr.length-1]=='docx'){
                    let does = this.fs.removeSync(this.pathmod.join(dirpath,files)) 
                    this.logman.log(does+' Фалы удалены: '+files);
                }               
            }
            if (what=='main') {
                if (files==mainname){
                    delans = files
                    let does = this.fs.removeSync(this.pathmod.join(dirpath,files)) 
                    this.logman.log(does+' Фалы удалены: '+files);
                }      
            }
        });
        return delans
    }
    getdbfolder(){
        let foldern = this.news_path_n.split('\\');
       // foldern = foldern[foldern.length-1];
        this.logman.log("Папка из бд",foldern);
        foldern = this.pathmod.join(this.news_path,'new',foldern)
        return foldern;
    }
    
    setsended(id){
        this.logman.log('ПУТЬsetsended(id)setsended(id)setsended(id)')
        var pathsent = this.pathmod.join(this.pathmod.dirname(require.main.filename),'public/news/sent')
        var pathnew = this.curpath(this.pathmod.normalize(this.news_path_n))
        let filesa = this.fs.readdirSync(pathnew)
        this.logman.log('Файлы в диерктории:'+filesa);
        filesa.forEach(files => {
            (async () => {
                await this.move(this.pathmod.join(pathnew,files), this.pathmod.join(pathsent,files), {
                  merge: false,
                  overwrite: false,
                  purge: false,
                  
                });
              })();

            //this.logman.log('Перемещен файл: '+this.pathmod.join(pathsent,files));
        })
        console.log(pathnew);
    }
}