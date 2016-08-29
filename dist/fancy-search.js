(function () {
    "use strict";

    app.factory('getFeed', ['$http', function ($http) { // TODO: Sorting, const endpoint
        return $http
                    .get('https://zniszcz.github.io/fancy-search/feed/hints.json')
                    .success( function (data) {
                        return data.hints;
                    })
                    .error( function (err) {
                        return err;
                    });
    }])
    .directive('fancysearch',  ['getFeed', '$window', function(getFeed, $window) {
        return {
            restrict: 'E',
            link: function ($scope, $element) {
                getFeed.success( function (data) {
                    $scope.hints = data.hints;
                });
                $scope.isActive = false;
                $scope.search = {
                    query: "",
                    postfix: "",
                    hint: "",
                    activeHint: 0
                };

                $scope.submit = function () {
                    $window.location.href = "https://google.com/search?q="+$scope.search.query;
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
                        hint: value,
                        activeHint: 0
                    };
                }

                $scope.$watch('search.query', function (newVal, oldVal) {
                    var res = ($scope.search.query) ? $scope.search.hint.substr($scope.search.query.length) : "";
                    return $scope.search.postfix = res;
                });

                $element.bind("keydown keypress", function(event) {
                    var keyCode = event.which || event.keyCode;
                    if (keyCode === 9) {
                        $scope.updateQuery();
                        $scope.choose($scope.search.hint);
                    }
                });
            },
            templateUrl: 'partials/fancy-search.html'
        };
    }]);
})();
