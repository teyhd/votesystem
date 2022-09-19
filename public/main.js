//const { test } = require("../orthog");

  $(document).ready(function(){
        
    $( "#sendnews" ).submit(function( event ) {
      event.preventDefault();
      this.submit();
    });
    $('#commentbox').change(function(){
      console.log($(this).is(':checked'));
      if ($(this).is(':checked')){
        $('#combox').show(100);
      } else {
        $('#combox').hide(100);
      }
    });    
    $('#commentbo').change(function(){
      console.log($(this).is(':checked'));
      if ($(this).is(':checked')){
        $('#combox').hide(100);
      } 
    });   
    
    $("#editnews").submit(function( event ) {
      event.preventDefault();
     // $("#all_pic_name").val(`${$("#all_pic_name").val()},${getimg()}`);
     // alert($("#all_pic_name").val())
      getfordel()
      this.submit();
    });

    function getfordel() {
      var fordela = []  
      $( ".delbtnc" ).each(function() {
        if ($( this ).parent().parent().prop('disabled')) {
          fordela.push($( this ).attr('id'));
          console.log($( this ).attr('id') );
        } else {
          console.log('no');
        }
      });  
      fordela = fordela.toString() 
      $("#fordel").val(fordela)  ;
      
    }
    
    $( "#sign" ).click(function() {
      if ($( "#sign" ).attr('name')=='login') {
        event.preventDefault();
        $( "#mpopup" ).show();
      }
       else logout()
    })
    $( "#close" ).click(function() {
      event.preventDefault();
      $( "#mpopup" ).hide();
    })
    $( ".delbtnc" ).click(function() {
      event.preventDefault();
    })
    

    $( ".delbtnc" ).on( "mousedown", function() {
      event.preventDefault();

      //console.log($( this ).attr('id') );
      var stylesgray = {
        "-webkit-filter" : "grayscale(1);",
        "filter": "gray",
        "filter": "grayscale(1)"         
      }; 
      var stylesnogray = {
        "-webkit-filter" : "grayscale(0);",
        "filter": "gray",
        "filter": "grayscale(0)"         
      }; 
      let divbl = $( this ).parent().parent();
      if (!divbl.prop('disabled')) {
        divbl.prop('disabled', true);
        divbl.css( stylesgray );
        $( this ).text('Восстановить фото');
        //console.log($( this ).attr('id'));
        
      }else{
        divbl.css( stylesnogray );
        divbl.prop('disabled', false);
        $( this ).text('Удалить фото');
        
      }

      console.log(divbl.prop('disabled'));
  })

    $( "#new_head" ).val()
    $( "#mp_date" ).val()
    $( "#new_auth" ).val()
    $( "#main_pic_name" ).val()
    $( "#all_pic_name" ).val()
    
    $( "#btnl" ).click(function() {
      //M.toast({html: 'Пожалуйста, заполните содержание', classes: '#ef5350 red lighten-1 rounded'});
      event.preventDefault();
      if ($( "#pass" ).val()!=''){
       // $( "#btnl" ).submit();
        let tosend = $( "#pass" ).val();
        $.get( "/auth", {pass: tosend} )
        .done(function( data ) {
          console.log( "Data Loaded: " + data );
            if (data=='ok'){
            M.toast({html: 'Авторизация - успешно!', classes: '#26a69a teal lighten-1 rounded'});
            reload(true);
          } else {
            M.toast({html: 'Неверный пароль! Повторите попытку!', classes: '#ef5350 red lighten-1 rounded'});
            $( "#pass" ).val('');
          }
        });
        //console.log( "Handler for .click() called." );
      } else {
        M.toast({html: 'Пожалуйста, введите пароль!', classes: '#ef5350 red lighten-1 rounded'});
      }    
    });
    
    //M.toast({html: 'I am a toast!', classes: '#ef5350 red lighten-1 rounded'});
    $("#create").click(function(){
      event.preventDefault();
      checkandsend(true)
      Cookies.remove('head')
      Cookies.remove('text')
    })
    $("#editbtn").click(function(){
      event.preventDefault();
      checkandsend(false)
    })

    function checkandsend(iscreate) {
      //Все поля заполнены
      if (!head_is_valid()){
        M.toast({html: 'Исправьте заголовок в соответствии с требованиями!', classes: '#ef5350 red lighten-1 rounded'});
        M.toast({html: 'В Санкт-Петербургском пансионе воспитанниц прошло что-то', classes: '#ef5350 blue lighten-1 rounded'});
        M.toast({html: 'Воспитанницы Санкт-Петербургского пансиона что-то сделали', classes: '#ef5350 blue lighten-1 rounded'});
      } else{
        if ($("#mp_date").val()==''){
          M.toast({html: 'Укажите дату мероприятия!', classes: '#ef5350 red lighten-1 rounded'});
        } else{
          if ($("#new_auth").val()==''){
            M.toast({html: 'Укажите автора мероприятия!', classes: '#ef5350 red lighten-1 rounded'});
          } else{
            if (iscreate) {
               if ($("#main_pic_name").val()==''){
                  M.toast({html: 'Загрузите обложку мероприятия!', classes: '#ef5350 red lighten-1 rounded'});
                } else{
                  $("#create").submit();
                }
            } else{
              $("#editnews").submit();
            }
          }
          }
      }
     
    }

    $( "#btnorto" ).click(function() {
      event.preventDefault();
      if ($( "#new_text" ).val()!=''){
        let tosend = $( "#new_text" ).val();
        $.get( "/check", { text: tosend} )
        .done(function( data ) {
          console.log( "Data Loaded: " + data.result.length );
          if (data.result.length==0){

            $( "#card" ).hide();
            M.toast({html: 'Проверка текста - Пройдена успешно!', classes: '#26a69a teal lighten-1 rounded'});
          } else {
            M.toast({html: 'Необходимо исправить ошибки в тексте!', classes: '#ef5350 red lighten-1 rounded'});
            M.toast({html: `Количество ошибок: ${data.result.length}`, classes: '#ef5350 red lighten-1 rounded'});
            $( "#card" ).show();
           // $( "#create" ).prop('disabled', true);
          //  $( "#editbtn" ).prop('disabled', true);
            $("#cardcontent").html( errtohtml(data.result) )
          }
          $( "#create" ).prop('disabled', false);
          $( "#editbtn" ).prop('disabled', false);
        });
        console.log( "Handler for .click() called." );
      } else {
        $( "#new_text" ).addClass( "invalid" );
        M.toast({html: 'Пожалуйста, заполните содержание', classes: '#ef5350 red lighten-1 rounded'});
      }    
    });
    function errtohtml(arrerr){
      let ans = '<p>Необходимо исправить ошибки!</p>';
      for (let i = 0; i < arrerr.length; i++) {
        const element = arrerr[i];
        //ans = `${ans}\n <p id='err${i}'>[${arrerr[i].word}] - ${arrerr[i].s.join(' или ')} </p>`
        ans = `${ans}\n <p id='err${i}'>[${arrerr[i].word}] - ${arrerr[i].s[0]} </p>`
      }
      return ans;
    }
    function head_is_valid(){
      let flag = false;
      headtext = $( "#new_head" ).val().toLowerCase();
      let matches = headtext.match(/санкт-петербург.*?|воспитан.*?|пансион.*?/gmi)
      if (matches==null) {flag = false;}
      else {
        if (matches.length > 2){
          flag = true
        } else flag = false
      }
      return flag
    }
    function wordInString(string, keywords) {
      return string.split(/\b/).filter(function(w) {
          return w.indexOf(keywords) !== -1;
      }).length > 0;
  }
 
    $( "#new_text" ).keydown(function() {
      $( "#new_text" ).removeClass( "invalid" );
      Cookies.set('text', $( "#new_text" ).val())
    });
 
    $( "#new_head" ).keydown(function() {
      $( "#new_head" ).removeClass( "validate" );
       if (!head_is_valid()){
        $( "#new_head" ).removeClass( "valid" );
        $( "#new_head" ).addClass( "invalid" );
       }else{
        $( "#new_head" ).removeClass( "invalid" );
        $( "#new_head" ).addClass( "valid" );
       }
      
     // console.log('ok');
    });
    
    function curimgn(name) {
      let ans = name.split('/');
      if (ans) return ans[ans.length-1]
      else return false;
    }
    function getimg() {
      let arr = [];
      for (let i = 0; i < $( "img" ).length; i++) {
        arr.push(curimgn($( "img" ).eq( i ).attr( "src" )));
      }
      arr = arr.toString() 
      console.log(arr);
      return arr
    }
    
    function logout(){
      M.toast({html: 'Выход из аккаунта', classes: '#ef5350 red lighten-1 rounded'});
      $.get( "/logout");
      reload(true);
    }

    function reload(p){
      if (p) setTimeout(reload, 50);
      else location.reload();
    }
    
    function onendload() {
      $.get( "/data", { width: window.screen.width, height: window.screen.height,dtype: getDeviceType()} ).done(function( data ) {
        console.log( "Data Loaded: " + data );
      });;
    }
    const getDeviceType = () => {
      const ua = navigator.userAgent;
      if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
        return "tablet";
      }
      if (
        /Mobile|iP(hone|od)|Android|BlackBerry|IEMobile|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(
          ua
        )
      ) {
        return "mobile";
      }
      return "desktop";
    };
    onendload()
  });
