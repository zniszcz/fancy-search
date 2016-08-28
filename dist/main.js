(function () {
  "use strict";

  var request = new XMLHttpRequest();

    document.getElementById('showToDo').onclick = function () {
      var todos = document.getElementsByClassName('todo');

      for (var i = 0; i<todos.length; i++)
        todos[i].classList.add('show');
    };

    request.open('GET', 'https://zniszcz.github.io/fancy-search/feed/hints.json', true);

    request.onload = function() {
      if (request.status >= 200 && request.status < 400) {
        var data = JSON.parse(request.responseText)

        init(data.hints);
      } else  console.warn("There was a problem with server");
    };

    request.onerror = function() {
      console.warn("There was a problem with loading hint lists");
    };

    request.send();
})();

/*
              input
                .focus(function () {
                  form.toggleClass('active');
                })
                .blur(function () {
                  form.toggleClass('active');
                })
                .on('input', function () {
                  var val = $(this).val(),
                      firstHint = getFirstHint(val),
                      postfix = (firstHint && val) ? firstHint.substr(val.length) : "",
                      filtredHints = filtreHints(val),
                      bufferHint = "";

                  search.query.html(val);
                  search.hint.html(postfix);

                  for(var hint in filtredHints)
                    bufferHint += "<li>"+filtredHints[hint]+"</li>"

                  hintsList
                    .html(bufferHint)
                    .find('li').click( function () {
                        var val = $(this).html();

                        search.query.html(val);
                        search.hint.html("");
                        input.val(val);
                    });

                  $(this).keydown( function (e) {
                      var code = e.keyCode || e.which,
                          pass = true;

                      if(code == '9' && getFirstHint(val)) {
                        e.preventDefault();

                        search.query.html(firstHint);
                        search.hint.html("");
                        input.val(firstHint);

                        pass = !pass;
                      }
                      return pass;
                  });
                });
        });

        function getFirstHint(val) {
          var filtred = $.grep(hints, function (phrase) {
              return phrase.toUpperCase().search(val.toUpperCase()) == 0;
          })
          console.log(filtred[0]);
          return filtred[0];
        }

        function filtreHints (val) {
          var filtred = $.grep(hints, function (phrase) {
              return phrase.toUpperCase().search(val.toUpperCase()) >= 0;
          })
          return filtred.slice(config.hintNumbers).sort();
        }
  }
})(jQuery);
*/
