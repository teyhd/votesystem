const fs = require('fs-extra');
const path = require('path');
function curdate(minute){
    minute = (minute < 10) ? '0' + minute : minute;
    return minute;
  }
  

exports.log = log

function log (par) {
    let datecreate = new Date();
    let texta = `\n ${curdate(datecreate.getHours())}:${curdate(datecreate.getMinutes())}:${curdate(datecreate.getSeconds())}`;
    let obj = log.arguments;
  
    for (const key in obj) {
      if (typeof obj[key]=='object') {
        for (const keys in obj[key]){
          texta = `${texta} \n ${keys}:${obj[key][keys]}`
        }
      } else {
        texta = `${texta} ${obj[key]}`
      }
      
    } 
    fs.writeFileSync(path.join('logs',`${curdate(datecreate.getDate())}.${curdate(datecreate.getMonth()+1)} log.txt`),
    texta,
    {
      encoding: "utf8",
      flag: "a+",
      mode: 0o666
    });
  
    console.log(texta);
    return texta
  }

/* let file = fs.readFileSync(path.join(__dirname, 'user.txt'),{encoding: 'utf-8', flag:'r'})
let names = file.split("\n")
names.forEach(e=>{
  e = e.toLowerCase()
  let f = e.split(".")
  let ans = `${f[0]}`
  ans = ans.replace(/\s{1,}/gm,'.');
  ans = ans.replace(/^[ \s]+|[ \s]+$/gm,'');
  ans = ans.split(".")
  console.log(`${ans[1]}.${ans[0]}`)
 // console.log(`${f[1]} ${f[1].slice(0, 1)}.${f[2].slice(0, 1)}`)
})
 */