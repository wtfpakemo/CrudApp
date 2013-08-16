'use strict';

angular.module('CrudApp', ['ngResource'])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/create', {
        templateUrl: 'views/create.html',
        controller: 'CreateCtrl'
      })      
      .otherwise({
        redirectTo: '/'
      });
  })


angular.module('CrudApp').run(function ($rootScope) {
    window.fbAsyncInit = function () {
        FB.init({
            appId:'631393816946944',
            channelUrl : '//localhost:9000/channel.html', // Channel File
            status:true,
            cookie:true,
            xfbml:true
        });
    };

    (function (d) {
        var js, id = 'facebook-jssdk', ref = d.getElementsByTagName('script')[0];
        if (d.getElementById(id)) {
            return;
        }
        js = d.createElement('script');
        js.id = id;
        js.async = true;
        js.src = "//connect.facebook.net/en_US/all.js";
        ref.parentNode.insertBefore(js, ref);
    }(document));
  
});

