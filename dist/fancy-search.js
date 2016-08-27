(function () {
  "use strict";

  app.directive('fancysearch',  function() {
    return {
      restrict: 'E',
      scope: true,
      link: function (scope) {
        scope.hints = ["Hint A", "Hint B", "Hint C"];

        // return console.log("")
      },
      templateUrl: 'partials/fancy-search.html'
    };
  });

})();
