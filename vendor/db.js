const e = require('express');

module.exports.dbworker = class dbworker {
  constructor() {
     this.syncSql = require('sync-sql');
     this.unixTime = require('unix-time');
     this.logman = require('./logs.js');
     this.path = require('path');
      this.sett = {
        host     : '127.0.0.1',
        //host     : '192.168.0.104',
        user     : 'teyhd',
        password : '258000',
        database : 'votesys',
       // database : 'news',
        charset : 'utf8mb4_general_ci'
      }
    }

    getallusers(){
      let q = `SELECT * FROM users;`;
      let an = this.syncSql.mysql(this.sett,q).data.rows;
      return an;
    }
    
    getusersrep(){
      let q = `SELECT name,lastseen,role FROM users WHERE lastseen>0;`;
      let an = this.syncSql.mysql(this.sett,q).data.rows;
      return an;
    }

    getvoted(userid){
      let q = `SELECT filmid FROM vote WHERE nameid=${userid};`;
      let an = this.syncSql.mysql(this.sett,q).data.rows;
      return an;
    }
    
    gettyperes(type){
      let q = `SELECT COUNT(*) as count,pku,film,TYPE,TIME,
      ROUND(CAST(sum(janr) AS DEC(12,4))/COUNT(*),2) AS janr,
      ROUND(CAST(sum(dram) AS DEC(12,4))/COUNT(*),2) AS dram,
      ROUND(CAST(sum(actu) AS DEC(12,4))/COUNT(*),2) AS actu,
      ROUND(CAST(sum(orig) AS DEC(12,4))/COUNT(*),2) AS orig,
      ROUND(CAST(sum(soder) AS DEC(12,4))/COUNT(*),2) AS soder,
      ROUND(CAST(sum(hyd) AS DEC(12,4))/COUNT(*),2) AS hyd,
      ROUND(CAST(sum(tex) AS DEC(12,4))/COUNT(*),2) AS tex,
      ROUND(CAST(sum(vira) AS DEC(12,4))/COUNT(*),2) AS vira,
      ROUND(CAST(sum(janr) AS DEC(12,4))/COUNT(*),2)+ROUND(CAST(sum(dram) AS DEC(12,4))/COUNT(*),2)+
		ROUND(CAST(sum(actu) AS DEC(12,4))/COUNT(*),2)+ROUND(CAST(sum(orig) AS DEC(12,4))/COUNT(*),2)+
		ROUND(CAST(sum(soder) AS DEC(12,4))/COUNT(*),2)+ROUND(CAST(sum(hyd) AS DEC(12,4))/COUNT(*),2)+
		ROUND(CAST(sum(tex) AS DEC(12,4))/COUNT(*),2)+ROUND(CAST(sum(vira) AS DEC(12,4))/COUNT(*),2) AS itog      
      FROM vote , film
      WHERE vote.filmid = film.id
      AND TYPE = ${type}
      GROUP BY film
      ORDER BY itog DESC`
      return this.syncSql.mysql(this.sett,q).data.rows;
    }
    getuservoice(type,userid){
      let q = `SELECT row_number() over(ORDER BY janr+dram+actu+orig+soder+hyd+tex+vira DESC) AS id,pku,film,type,janr,dram,actu,orig,soder,hyd,tex,vira,time,
      janr+dram+actu+orig+soder+hyd+tex+vira as itog
      FROM vote , film
      WHERE vote.filmid = film.id
      AND type = ${type}
      AND nameid = ${userid}
      GROUP BY film
      ORDER BY itog DESC`
      return this.syncSql.mysql(this.sett,q).data.rows;
    }

    updatevotepar(id,par,val){
      let qur = `UPDATE vote SET ${par}=${val} WHERE id=${id};`
      let ans = this.syncSql.mysql(this.sett,qur).data;
      console.dir(ans)
      return ans;
    }
    getvoteusr(nameid,filmid){
      let q = `SELECT * FROM vote WHERE nameid=${nameid} AND filmid=${filmid};`;
      let an = this.syncSql.mysql(this.sett,q).data.rows[0];
      return an
    }
    addvote(nameid,filmid,t){
      let q = `SELECT id as insertId FROM vote WHERE nameid=${nameid} AND filmid=${filmid};`;
      let an = this.syncSql.mysql(this.sett,q).data.rows[0];
          try {
            if (an!=undefined) {
              this.logman.log('Заменил голос')
              return an
            } else{
              let qur = `INSERT INTO vote (nameid,filmid,time) VALUES (${nameid},${filmid},${t});`;
              let ans = this.syncSql.mysql(this.sett,qur).data.rows;
              return ans;
            }
          } catch (error) {
            console.dir(error)
          }
     // INSERT INTO `vote` (`nameid`, `filmid`) VALUES ('12', '12');
    }

  getfilms(type){
    let q = `SELECT * FROM ${this.sett.database}.film WHERE type=${type}`
    return this.syncSql.mysql(this.sett,q).data.rows;
  }
  
  getfilm(id){
    let q = `SELECT * FROM ${this.sett.database}.film WHERE id=${id}`
    return this.syncSql.mysql(this.sett,q).data.rows; 
  }

  getleadersnews(){
    let q = `SELECT autor,COUNT(*) AS ans FROM ${this.sett.database}.news GROUP BY autor ORDER BY ans DESC LIMIT 3;`
    return this.syncSql.mysql(this.sett,q).data.rows;
  }
  getnews(id){
    let q = `SELECT * FROM ${this.sett.database}.news WHERE id=${id};`
    return this.syncSql.mysql(this.sett,q).data.rows[0];
  }

  getmainpic(id){
    let q = `SELECT CONCAT(pict,types) AS pict FROM ${this.sett.database}.pict WHERE newsid=${id} AND pict='main';`
    let ans = false
    try {
    ans = this.syncSql.mysql(this.sett,q).data.rows[0].pict
   } catch (error) {
    ans = false
   }
    return ans;
  }
  getpic(id){
    let q = `SELECT CONCAT(pict,types) AS pict FROM ${this.sett.database}.pict WHERE newsid=${id};`
    return this.syncSql.mysql(this.sett,q).data.rows;
  }

  addpict(newsid,pic){
    let type = pic.match(/\.[0-9a-z]+$/i)
    let qur = `INSERT INTO ${this.sett.database}.pict (newsid,pict,types) VALUES (${newsid},'${pic.slice(0, type.index)}','${type}');`;
    let ans = this.syncSql.mysql(this.sett,qur).data;
    console.dir(ans)
    return ans;
  }

  dellpict(id,name){
    let type = name.match(/\.[0-9a-z]+$/i)
    let qur = `DELETE FROM ${this.sett.database}.pict WHERE newsid=${id} AND pict='${name.slice(0, type.index)}' AND types='${type}';`;
    let ans = this.syncSql.mysql(this.sett,qur).data;
    console.dir(ans)
    return ans;
  }
  fixpict(){
    let q = `SELECT * FROM ${this.sett.database}.pict ORDER BY id DESC;`
    let ans = this.syncSql.mysql(this.sett,q).data.rows
    ans.forEach(element => {
      try {
        let type = element.pict.match(/\.[0-9a-z]+$/i)
        if (type!=null) {
        let qur = `UPDATE ${this.sett.database}.pict SET pict='${element.pict.slice(0, type.index)}',types='${type}' WHERE id=${element.id};`;
        let ansd = this.syncSql.mysql(this.sett,qur).data;
        console.dir(ansd)
        }
        
      } catch (error) {
        console.dir(error)
      }
    });
    return ans;
  }
  updatepict(id,name,newpic){
    let typeo = name.match(/\.[0-9a-z]+$/i)
    let typen = newpic[0].match(/\.[0-9a-z]+$/i)
    let qur = `UPDATE ${this.sett.database}.pict SET pict='${newpic[0].slice(0, typen.index)}',types='${typen}' WHERE newsid=${id} AND pict='${name.slice(0, typeo.index)}' AND types='${typeo}';`;
    let ans = this.syncSql.mysql(this.sett,qur).data;
    this.logman.log("UPDATE",qur)
    //console.dir(ans)
    return ans;
  }
  getsentnews(){
    let q = `SELECT * FROM ${this.sett.database}.news WHERE status=3 ORDER BY id DESC;`
    let ans = this.syncSql.mysql(this.sett,q).data.rows;
    return ans
  }
  updatenews(id,head,cont,autor,mpdate,path){
    let qur = `UPDATE ${this.sett.database}.news SET head='${head}', cont='${cont}', autor='${autor}' , mpdate=${mpdate}, path='${path}' WHERE id=${id};`
    let ans = this.syncSql.mysql(this.sett,qur).data;
    this.logman.log("Новая дата ",mpdate);
    return ans;
  }
  updatefolder(id,npath){
    let qur = `UPDATE ${this.sett.database}.news SET path='${npath}' WHERE id=${id};`
    let ans = this.syncSql.mysql(this.sett,qur).data;
    return ans;
  }

  updatestat(id,status){
    let qur = `UPDATE ${this.sett.database}.news SET status=${status} WHERE id=${id};`
    let ans = this.syncSql.mysql(this.sett,qur).data;
    return ans;
  }
  updatecomm(id,comment){
    let qur = `UPDATE ${this.sett.database}.news SET comment='${comment}' WHERE id=${id};`
    let ans = this.syncSql.mysql(this.sett,qur).data;
    return ans;
  }
  updatelink(id,link){
    let qur = `UPDATE ${this.sett.database}.news SET link='${link}' WHERE id=${id};`
    let ans = this.syncSql.mysql(this.sett,qur).data;
    return ans;
  }
  updateshead(id,shead){
    let qur = `UPDATE ${this.sett.database}.news SET shead='${shead}' WHERE id=${id};`
    let ans = this.syncSql.mysql(this.sett,qur).data;
    return ans;
  }

  addnews(head,cont,autor,status,mpdate,date,pictures,path){
    let qur = `INSERT INTO ${this.sett.database}.news (head,cont,autor,status,mpdate,date,path) VALUES ('${head}','${cont}','${autor}',${status},${mpdate},${date},'${path}');`;
    let ans = this.syncSql.mysql(this.sett,qur).data;
    pictures.forEach(element => {
      this.addpict(ans.rows.insertId,element)
      });
    return ans.rows.insertId;
  }

  getsendfolder(){
    let qur = `SELECT * FROM ${this.sett.database}.news WHERE status=2;`;
    let ans = this.syncSql.mysql(this.sett,qur).data;
    return ans
  }
  newssetfold(id,pathn){
    let qur = `UPDATE ${this.sett.database}.news SET path='${pathn}' WHERE id=${id};`
    let ans = this.syncSql.mysql(this.sett,qur).data;
    return ans;
  }
  ////// NEW TABLES
  ///////NEW STATUS SYSTEM
  getstat(type,hisid){
    let qur = `SELECT * FROM ${this.sett.database}.status WHERE types=${type} AND hisid=${hisid} ORDER BY id DESC LIMIT 1;`;
    let ans = this.syncSql.mysql(this.sett,qur).data.rows[0].status;
    //console.log(ans);
    return ans
  }
  setstat(stat,type,hisid,nameid){
    let lastup = this.unixTime(new Date());
    //`newstest`.`status` (`types`, `hisid`, `status`, `nameid`, `time`) VALUES ('1', '1', '1', '1', '1');
    let qur = `INSERT INTO ${this.sett.database}.status (types,hisid,status,nameid,time) VALUES (${type},${hisid},${stat},${nameid},${lastup});`;
    let ans = this.syncSql.mysql(this.sett,qur).data;
    this.logman.log(`${nameid} Поменял статус у новости №${hisid} на ${stat}`)
    return ans;
  }
  //////// NEW USER SYSTEM
  usrbyid(id){
    let qur = `SELECT * FROM ${this.sett.database}.users WHERE id=${id};`;
    let ans = this.syncSql.mysql(this.sett,qur).data.rows[0];
    return ans
  }
  getusr(adlogin){
    let qur = `SELECT * FROM ${this.sett.database}.users WHERE adlogin='${adlogin}';`;
    let ans = this.syncSql.mysql(this.sett,qur).data.rows[0];
    try {
      if (ans!=undefined){
        let lastup = this.unixTime(new Date());
        let q = `UPDATE ${this.sett.database}.users SET lastseen=${lastup} WHERE id=${ans.id};`
        let a = this.syncSql.mysql(this.sett,q).data;
        //console.dir(a)
      } else {
        return false;
      }
    } catch (error) {
      
    }
    return ans
  }
  adduser(adlogin,name){
    let lastup = this.unixTime(new Date());
    let qur = `INSERT INTO ${this.sett.database}.users (name,adlogin,lastseen) VALUES ('${name}','${adlogin}',0);`;
    let ans = this.syncSql.mysql(this.sett,qur).data.rows.insertId;
    this.logman.log(`${name} зашел первый раз`)
    return ans;
  }
  uplastseen(id){
    let lastup = this.unixTime(new Date());
    let qur = `UPDATE ${this.sett.database}.users SET lastseen=${lastup} WHERE id=${id};`
    let ans = this.syncSql.mysql(this.sett,qur).data;
    return ans;
  }
  //////// NEW Autentif SYSTEM
  sesscreate(sesid){
   let lastup = this.unixTime(new Date());
   let qur = `INSERT INTO ${this.sett.database}.auten (sesid,time) VALUES ('${sesid}',${lastup});`;
   let ans = this.syncSql.mysql(this.sett,qur).data;
   //console.log(ans)
   return ans;
  }
  getautinfo(sesid){
    let qur = `SELECT * FROM ${this.sett.database}.auten WHERE sesid='${sesid}';`;
    try {
      let ans = this.syncSql.mysql(this.sett,qur).data.rows[0];
      //console.dir(ans);
      if (ans!=undefined){
        return ans;
      } else{
        this.sesscreate(sesid);
        return false;
      }
    } catch (error) {
      this.logman.log(error)
    }
  }
  updateautnerinfo(sesid,wid,hei,dtype,ip){
    let lastup = this.unixTime(new Date());
    let qur = `UPDATE ${this.sett.database}.auten SET width=${wid},height=${hei},devtype='${dtype}',ip='${ip}',time=${lastup} WHERE sesid='${sesid}';`
    let ans = this.syncSql.mysql(this.sett,qur).data;
    return ans;
  }
  updatename(nameid,sesid){
    let qur = `UPDATE ${this.sett.database}.auten SET nameid=${nameid} WHERE sesid='${sesid}';`
    let ans = this.syncSql.mysql(this.sett,qur).data;
    //console.dir(ans)
    return ans;
  }


}
