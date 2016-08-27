(function () {
  "use strict";

  app.directive('fancysearch',  function() {
    return {
      restrict: 'E',
      scope: true,
      link: function (scope) {
        scope.search = {};
        scope.hints = ["Hint AAA", "Hint AAB", "Hint AAC", "Hint AA", "Hint CCC", "Hint CCA", "Hint CCB"];
        scope.isActive = false;
        scope.hint = "test"+scope.search.query;

        // return console.log("")
      },
      templateUrl: 'partials/fancy-search.html'
    };
  });

})();
