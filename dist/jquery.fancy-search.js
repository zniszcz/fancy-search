(function ($) {
    "use strict";

    $.fn.fancySearchInit = function ( config ) {
        if(!$('form.fancy-search')) return console.warn("Fancy search not called in HTML");
        if($.isEmptyObject(config) || !config)
            config = {
                placeholder: "Search...",
                submit: "Go!",
                hintNumbers: 3,
                hintURL: "https://zniszcz.github.io/fancy-search/feed/hints.json"
        }

        var form = $('form.fancy-search'),
            hints = [],
            raw = "<div class='input-group'><div class='currentHint'><span class='query'></span><span class='hint'></span></div><input name='q' class='input' type='text' autocomplete='off' placeholder='"+config.placeholder+"'/><input class='button' type='submit' value='"+config.submit+"' /><ul class='hints'> </ul></div>";

        // TODO:
        // 1. Uwzględnić tylko kilka parametrów przekazanych w configu
        // 2. Testy
        // 3. po wpisaniu niepasującej frazy tabulator i tak uzupełnia pierwszym.

        $.ajax({
            url: config.hintURL,
            success: function (data) {
                hints = data.hints;
            }
        });

        form.html(raw).ready( function () {
            var search = {
                query: form.find('.query'),
                hint: form.find('.hint'),
            },
            input = form.find('.input'),
            button = form.find('.button'),
            hintsList = form.find('.hints');

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
                })
                .keydown( function (e) {
                    var code = e.keyCode || e.which,
                        pass = true;

                    if(code == '9') {
                        var val = input.val(),
                            firstHint = getFirstHint(val);

                        e.preventDefault();

                        if(firstHint) {
                            search.query.html(firstHint);
                            search.hint.html("");
                            input.val(firstHint);
                            hintsList.html("");
                        }

                        pass = !pass;
                    }

                    return pass;
                });
            });

            function getFirstHint(val) {
                var filtred = $.grep(hints, function (phrase) {
                    return phrase.toUpperCase().search(val.toUpperCase()) == 0;
                });
                return filtred[0];
            }

            function filtreHints (val) {
                var filtred = $.grep(hints, function (phrase) {
                    return phrase.toUpperCase().search(val.toUpperCase()) >= 0;
                });

                return filtred.slice(0,config.hintNumbers).sort();
            }
    }
})(jQuery);
