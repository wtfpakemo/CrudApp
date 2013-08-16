"use strict";angular.module("CrudApp",["ngResource"]).config(["$routeProvider",function(a){a.when("/",{templateUrl:"views/main.html",controller:"MainCtrl"}).when("/create",{templateUrl:"views/create.html",controller:"CreateCtrl"}).otherwise({redirectTo:"/"})}]),angular.module("CrudApp").run(["$rootScope",function(){window.fbAsyncInit=function(){FB.init({appId:"631393816946944",channelUrl:"//localhost:9000/channel.html",status:!0,cookie:!0,xfbml:!0})},function(a){var b,c="facebook-jssdk",d=a.getElementsByTagName("script")[0];a.getElementById(c)||(b=a.createElement("script"),b.id=c,b.async=!0,b.src="//connect.facebook.net/en_US/all.js",d.parentNode.insertBefore(b,d))}(document)}]),angular.module("CrudApp").controller("MainCtrl",["$scope","record",function(a,b){a.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"],a.records=b.query()}]),angular.module("CrudApp").controller("CreateCtrl",["$scope","record","$location",function(a,b,c){a.record=new b,a.submit=function(){a.record.$save(),c.path("/")}}]),angular.module("CrudApp").factory("record",["$resource",function(a){return a("../records.json/:id",{id:"@id"})}]),angular.module("CrudApp").factory("Facebook",["$rootScope",function(a){return{getLoginStatus:function(){FB.getLoginStatus(function(b){a.$broadcast("fb_statusChange",{status:b.status})},!0)},login:function(){FB.getLoginStatus(function(b){switch(b.status){case"connected":a.$broadcast("fb_connected",{facebook_id:b.authResponse.userID});break;case"not_authorized":FB.login(function(b){b.authResponse?a.$broadcast("fb_connected",{facebook_id:b.authResponse.userID,userNotAuthorized:!0}):a.$broadcast("fb_login_failed")},{scope:"read_stream, publish_stream, email"});break;default:FB.login(function(b){b.authResponse?(a.$broadcast("fb_connected",{facebook_id:b.authResponse.userID}),a.$broadcast("fb_get_login_status")):a.$broadcast("fb_login_failed")})}},!0)},logout:function(){FB.logout(function(b){b?a.$broadcast("fb_logout_succeded"):a.$broadcast("fb_logout_failed")})},unsubscribe:function(){FB.api("/me/permissions","DELETE",function(){a.$broadcast("fb_get_login_status")})}}}]),angular.module("CrudApp").controller("FacebookCtrl",["$scope","$rootScope","Facebook",function(a,b,c){a.info={},b.$on("fb_statusChange",function(a,c){b.fb_status=c.status,b.$apply()}),b.$on("fb_get_login_status",function(){c.getLoginStatus()}),b.$on("fb_login_failed",function(){console.log("fb_login_failed")}),b.$on("fb_logout_succeded",function(){console.log("fb_logout_succeded"),b.id=""}),b.$on("fb_logout_failed",function(){console.log("fb_logout_failed!")}),b.$on("fb_connected",function(a,c){var d={};c.userNotAuthorized===!0?(console.log("user is connected to facebook but has not authorized our app"),FB.api({method:"fql.multiquery",queries:{q1:"SELECT uid, first_name, last_name FROM user WHERE uid = "+c.facebook_id,q2:"SELECT url FROM profile_pic WHERE width=800 AND height=800 AND id = "+c.facebook_id}},function(a){d={facebook_id:a[0].fql_result_set[0].uid,first_name:a[0].fql_result_set[0].first_name,last_name:a[0].fql_result_set[0].last_name,picture:a[1].fql_result_set[0].url}})):(console.log("user is connected to facebook and has authorized our app"),d={facebook_id:c.facebook_id},b.session=d)}),a.getLoginStatus=function(){c.getLoginStatus()},a.login=function(){c.login()},a.logout=function(){c.logout(),b.session={}},a.unsubscribe=function(){c.unsubscribe()},a.getInfo=function(){FB.api("/"+b.session,function(a){console.log("Good to see you, "+a+"."),console.log(a),console.log(b.session.facebook_id)}),b.info=b.session}}]);