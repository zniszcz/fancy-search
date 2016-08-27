(function () {
  "use strict";

  app.directive('fancysearch',  function() {
    return {
      restrict: 'E',
      // scope: {
      //   search: "="
      // },
      link: function ($scope, $element) {
        $scope.hints = ["AAA", "AAB", "AAC", "ABA", "CCC", "CCA", "CCB"]; // TODO: sort data at start;
        $scope.isActive = false;
        $scope.search = {
          query: "",
          postfix: "",
          hint: ""
        };

        $scope.updateQuery = function () {
              for (var i in $scope.hints) {
                if($scope.hints[i].toUpperCase().lastIndexOf($scope.search.query.toUpperCase(), 0) === 0)
                  return $scope.search.hint = $scope.hints[i];
              } return $scope.search.hint = "";
            };

        $scope.choose = function (value) {
            return $scope.search = {
                  query: value,
                  postfix: "",
                  hint: value
            };
        }

        $scope.$watch('search.query', function (newVal, oldVal) {
            var res = ($scope.search.query) ?
                          $scope.search.hint.substr($scope.search.query.length) : "";

            return $scope.search.postfix = res;
        });

        $element.bind("keydown keypress", function(event) {
            var keyCode = event.which || event.keyCode;
            if (keyCode === 9) {
              $scope.updateQuery();
              $scope.choose($scope.search.hint);
            }
        });

        // return console.log(scope)
      },
      templateUrl: 'partials/fancy-search.html'
    };
  });

})();
