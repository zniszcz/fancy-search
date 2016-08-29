(function ($) {
    "use strict";

    $('button#showToDo').click( function () {
        $('.todo').addClass('show');
    });
    $('form.fancy-search').fancySearchInit();

})(jQuery);
