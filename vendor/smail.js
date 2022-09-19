const nodemailer = require('nodemailer')
let transporter = nodemailer.createTransport({
    host: 'smtp.yandex.ru',
    port: 465,
    secure: true,
    auth: {
      user: 'spiderman200101@yandex.ru',
      pass: 'fvguhggmfmbbvtss',
    },
  })
  exports.sendmail = sendmail
function sendmail(filename){
    let result = transporter.sendMail({
        from: '"Владислав Пансион СПБ" <vlad@iteyhd.ru>',
        to: 'spiderman200101@yandex.ru,info@mil.ru',
       // to: 'vladteyhd@mail.ru',
        subject: 'Новости на сайт Пансион СПБ',
        text: `http://news.pansion.spb.ru:500/news/zips/${filename} - ссылка на архив\n--\nС уважением,\nВладислав Дьяконов\n+7 (960) 371-92-71\nvlad@iteyhd.ru`,
        html:
          `<a href="http://news.pansion.spb.ru:500/news/zips/${filename}" download>Новости на сайт Пансион СПБ</a><br><a href="http://news.pansion.spb.ru:500/news/zips/${filename}" download>(Ссылка 1)</a><br><a href="http://news.pansion.spb.ru:500/download?down=${filename}" download>(Ссылка 2)</a><br>С уважением,<br>Владислав Дьяконов<br>+7 (960) 371-92-71<br>vlad@iteyhd.ru`,
          attachments: [
            {   // utf-8 string as an attachment
                filename: 'Ссылки.txt',
                content: `http://news.pansion.spb.ru:500/news/zips/${filename} - ссылка 1 \n http://news.pansion.spb.ru:500/download?down=${filename} - ссылка 2`
            },
            {   // use URL as an attachment
                filename: `${filename}`,
                path: `http://news.pansion.spb.ru:500/news/zips/${filename}`
            }
        ]
      })
      //http://localhost/news/zips/07.08 15-38-17 news.zip
      console.dir(result)
}
//sendmail('07.08-16-43-43-news.zip')

