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
            var data = JSON.parse(request.responseText);

            init(data.hints);
        } else  console.warn("There was a problem with server");
    };

    request.onerror = function() {
        console.warn("There was a problem with loading hint lists");
    };

    request.send();

    function init(hints) {
        var form = document.getElementsByClassName('fancy-search')[0],
            search = {
                query: document.getElementsByClassName('query')[0],
                hint: document.getElementsByClassName('hint')[0]
            },
            input = document.getElementsByClassName('input')[0],
            button = document.getElementsByClassName('button')[0],
            hintList = document.getElementsByClassName('hints')[0];

            input.addEventListener("focus", function () {
                form.classList.add("active");
            });

            input.addEventListener("blur", function () {
                form.classList.remove("active");
            });

            input.addEventListener("input", function () {
                var val = this.value,
                    firstHint = getFirstHint(val),
                    postfix = (firstHint && val) ? firstHint.substr(val.length) : "",
                    filtredHints = filtreHints(val),
                    bufferHint = "",
                    hintListCollection = [];

                search.query.innerHTML = val;
                search.hint.innerHTML = postfix;

                for(var hint in filtredHints)
                    bufferHint += "<li>"+filtredHints[hint]+"</li>"

                hintList.innerHTML = bufferHint;
                hintListCollection = hintList.childNodes;

                for(var i = 0; i < hintListCollection.length; i++)
                    hintListCollection[i].addEventListener('click', function () {
                        var val = this.innerHTML;
                            search.query.innerHTML = val;
                            search.hint.innerHTML = "";
                            input.value = val;
                    });

                // TODO:
                // 1. Validation of inputs
                // 2. Improove filters
                // 3.
            });

            input.addEventListener('keydown', function (e) {
                var code = e.keyCode || e.which,
                    pass = true;

                if(code == 9) {
                    var val = input.value,
                        firstHint = getFirstHint(val);

                    e.preventDefault();

                    if(firstHint) {
                        search.query.innerHTML = firstHint;
                        search.hint.innerHTML = "";
                        input.value = firstHint;
                    }

                    pass = !pass;
                }
                return pass;
            });

            function getFirstHint(val) {
                var filtred = hints.filter(function (phrase) {
                    return phrase.toUpperCase().search(val.toUpperCase()) == 0;
                });
                return filtred[0];
            }

            function filtreHints(val) {
                var filtred = hints.filter( function (phrase) {
                    return phrase.toUpperCase().search(val.toUpperCase()) >= 0;
                });
                return filtred.slice(0,3).sort();
            }
        }
})();

/*

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
*/
