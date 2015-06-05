angular
  .module('weangular', ['ngRoute'])

  .config(function ($routeProvider) {
      $routeProvider
        .when('/', {
          controller: 'WeatherController',
          controllerAs: 'weather',
          templateUrl: 'views/current.html'
        })
        .when('/:zip', {
          controller: 'WeatherController',
          controllerAs: 'weather',
          templateUrl: 'views/current.html'
        });
  })

  .controller('WeatherController', function ($http, $routeParams) {
    var vm = this;

    vm.zip = +$routeParams.zip;

    if (vm.zip) {
      $http
        .get(`http://api.wunderground.com/api/4887e91c6c12fd6e/conditions/q/${vm.zip}.json`)
        .success(function (data) {
          vm.temp_f = data.current_observation.temp_f;
        });
    } else {
      navigator.geolocation.getCurrentPosition(function (geoposition) {
        var lat = geoposition.coords.latitude;
        var long = geoposition.coords.longitude;

        $http
          .get(`http://api.wunderground.com/api/4887e91c6c12fd6e/conditions/q/${lat},${long}.json`)
          .success(function (data) {
            vm.temp_f = data.current_observation.temp_f;
          });

      });
    }

    vm.zipLookup = function () {
      window.location = '/#/' + vm.zip;
    };

  });
