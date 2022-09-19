$(document).ready(function(){
    document.addEventListener('DOMContentLoaded', function() {
        var elems = document.querySelectorAll('.modal');
        var instances = M.Modal.init(elems, options);
      });
      $('input#new_head').characterCounter();
      // Or with jQuery
      $('.modal').modal();
              
      var months = ['Январь','Февраль','Март','Апрель','Май','Июнь','Июль','Август','Сентябрь','Октябрь','Ноябрь','Декабрь']
      var monshot = ['Янв','Фев','Март','Апр','Май','Июнь','Июль','Авг','Сент','Окт','Нояб','Дек']
      var weekdaysAbbrev =['ВС','ПН','ВТ','СР','ЧТ','ПТ','СБ']
      
      $('.datepicker').datepicker({"firstDay":1,"format" : "dd mm","i18n" : {"months":months,"monthsShort":monshot,"weekdaysAbbrev":weekdaysAbbrev,"weekdaysShort":weekdaysAbbrev}});
      $('.materialboxed').materialbox();
      $( "#mpopup" ).hide();
      $('select').formSelect();
})