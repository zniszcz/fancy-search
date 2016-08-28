(function () {
  "use strict";

   window.app = angular.module('fancySearchSample', []);

    app.controller('MainController', ['$scope', function($scope) {
      $scope.todoHidden = true; // TODO: Routing?
    }]);

})();
