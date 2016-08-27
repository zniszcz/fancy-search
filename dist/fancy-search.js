(function () {
  "use strict";

  app.directive('fancysearch',  function() {
    return {
      restrict: 'E',
      // scope: {
      //   search: "="
      // },
      link: function ($scope) {
        $scope.search = {};
        $scope.search.query = "";
        $scope.search.postfix = "";
        $scope.search.hint = "";

        $scope.hints = ["AAA", "AAB", "AAC", "ABA", "CCC", "CCA", "CCB"]; // TODO: sort data at start;
        $scope.isActive = false;
        $scope.updateQuery = function () {
              for (var i in $scope.hints) {
                if($scope.hints[i].toUpperCase().lastIndexOf($scope.search.query.toUpperCase(), 0) === 0)
                  return $scope.search.hint = $scope.hints[i];
              } return $scope.search.hint = "";
            };

        $scope.$watch('search.query', function (newVal, oldVal) {
            var res = ($scope.search.query) ?
                          $scope.search.hint.substr($scope.search.query.length) : "";

            return $scope.search.postfix = res;
        });


        // return console.log(scope)
      },
      templateUrl: 'partials/fancy-search.html'
    };
  });

})();
