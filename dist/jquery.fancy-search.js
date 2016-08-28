(function ($) {
  "use strict";

  $.fn.fancySearchInit = function ( config ) {
    if(!$('form.fancy-search')) return console.warn("Fancy search not called in HTML");
    if($.isEmptyObject(config))
      config = {
        placeholder: "Search...",
        submit: "Go!",
        hintNumbers: 3
      }

    var form = $('form.fancy-search'),
        raw = "<div class='input-group'><div class='currentHint'><span class='query'></span><span class='hint'></span></div><input class='input' type='text' placeholder='"+config.placeholder+"'/><input class='button' type='submit' value='"+config.submit+"' /><ul class='hints'> </ul></div>";

        // TODO:
        // 1. Uwzględnić tylko kilka parametrów przekazanych w configu
        // 2.

        form.html(raw).ready( function () {
          var search = {
                query: form.find('.query'),
                hint: form.find('.hint'),
              },
              input = form.find('.input'),
              button = form.find('.button'),
              hints = form.find('.hints');

              input.focus(function () {
                  form.toggleClass('active');
                })
                .blur(function () {
                  form.toggleClass('active');
                })
                .on('input', function () {
                  var val = $(this).val();
                  search.query.html(val);
                });

        });
  }

})(jQuery);
