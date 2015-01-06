app.controller("MainAppController", function($rootScope, $scope, $location){
    $scope.searchTerm = null;
    $scope.version = require('./package.json').version;
    $scope.isPlayerMax = false;
    $scope.$location = $location;
    $rootScope.currentHash = null;
    $rootScope.getHash = function(trackObj){
        return (trackObj.artist + trackObj.title).replace(/\s+/g, '').replace(/\W/g, '').toLowerCase();
    };

    $rootScope.setHash = function (trackObj) {
        $rootScope.currentHash = $rootScope.getHash(trackObj);
    };

    $scope.doSearch = function ($event) {
        if($event.keyCode == 13)
            $location.path('search/' + $scope.searchTerm);
    };

    $scope.togglePlaylist = function() {
        $scope.isPlayerMax = !$scope.isPlayerMax;
    };

    $scope.getLocationPath = function (path, startsWith) {
        return startsWith ? ($location.path().indexOf(path) == 0) : ($location.path() == path);
    }
});