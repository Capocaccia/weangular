angular
  .module('weangular', [])
  .controller('WeatherController', function ($http) {
    var vm = this;

    navigator.geolocation.getCurrentPosition(function (geoposition) {
      var lat = geoposition.coords.latitude;
      var long = geoposition.coords.longitude;

      $http
        .get(`http://api.wunderground.com/api/4887e91c6c12fd6e/conditions/q/${lat},${long}.json`)
        .success(function (data) {
          vm.temp_f = data.current_observation.temp_f;
        });

    });
  });
