(function() {
  'use strict';

  angular
    .module('communityGardenApp')
    .factory('AuthService', AuthFactory);

    AuthFactory.$inject = ['RoleService', '$q', '$rootScope', 'ngDialog', '$resource', 'baseURL', '$http', '$localStorage', '$window', '$state']
    function AuthFactory (RoleService, $q, $rootScope, ngDialog, $resource, baseURL, $http, $localStorage, $window, $state) {
      var TOKEN_KEY = 'Token';
      var isAuthenticatedFlag = false;
      var authToken = undefined;
      var username = '';
      var userid = undefined;

      loadUserCredentials();

      //ToDo: refactor this to go as a service - ref: Lecture 21
      return {
        login: login,
        logout: logout,
        register: register,
        isAuthenticated: isAuthenticated,
        getUsername: getUsername,
        getUserId : getUserId
      };

      // ----------------------- implementation -------------------- //

      function login(loginData) {
        var loginUrl = baseURL + "people/login";
        console.log("DBG: authService:login() to url: " + loginUrl );

        $http.post(loginUrl, loginData)
          .then(function(response){ // on success
                 console.log("DBG: successfully logged in for: " + loginData.username + ' ( ' + response.data.userId + ' )');
                 console.log(response);
                 var credentials = { token: response.data.id, username:loginData.username, userid: response.data.userId, };
                 // get the roles from the current logged user
                 //ToDo: ...
                 //credentials = getLoggedUserRoles( credentials);
                 // store the current logged user
                 storeUserCredentials( credentials);
                 $rootScope.$broadcast('login:Successful');
                 $state.go('app');
               }
             , function(response){ // on error
                 console.log("DBG: error loggin in");
                 console.log(response);
                 isAuthenticatedFlag = false;
                 var message = '\
                   <div class="ngdialog-message">\
                   <div><h3>Login Unsuccessful</h3></div>' +
                     '<div><p>' +  response.data.error.message + '</p><p>' +
                       response.data.error.name + '</p></div>' +
                   '<div class="ngdialog-buttons">\
                       <button type="button" class="ngdialog-button ngdialog-button-primary" ng-click=confirm("OK")>OK</button>\
                   </div>'
                 ngDialog.openConfirm({ template: message, plain: 'true'});
             }
         );

            return;
        /*
        return Customer
          .login(loginData)
          .$promise
          .then(function(response) {
            $rootScope.currentUser = {
              id: response.user.id,
              tokenId: response.id,
              username: loginData.username
            };
            $rootScope.$broadcast('login:Successful');
          },
          function(response){

            var message = '\
                  <div class="ngdialog-message">\
                  <div><h3>Login Unsuccessful</h3></div>' +
                    '<div><p>' +  response.data.error.message + '</p><p>' +
                      response.data.error.name + '</p></div>' +
                  '<div class="ngdialog-buttons">\
                      <button type="button" class="ngdialog-button ngdialog-button-primary" ng-click=confirm("OK")>OK</button>\
                  </div>'

                  ngDialog.openConfirm({ template: message, plain: 'true'});
          });
          */
      } // login

      function isAuthenticated() {
          return isAuthenticatedFlag;
      }

      function getUsername() {
          return username;
      }


      function getUserId() {
          return userid;
      }

      function logout() {
        var logoutUrl = baseURL + "people/logout";
        console.log("DBG: authService:logout() to url: " + logoutUrl );

        $http.post(logoutUrl, {})
            .then(function(response){ // on success
                   console.log("DBG: successfully logged out");
                   console.log(response);
                   destroyUserCredentials();
                   $rootScope.$broadcast('logout:Successful');
                   $state.go('app');
                 }
               , function(response){ // on error
                   console.log("DBG: error loggin out");
                   console.log(response);
                   var message = '\
                     <div class="ngdialog-message">\
                     <div><h3>Logout Unsuccessful</h3></div>' +
                       '<div><p>' +  response.data.error.message + '</p> </div>' +
                     '<div class="ngdialog-buttons">\
                         <button type="button" class="ngdialog-button ngdialog-button-primary" ng-click=confirm("OK")>OK</button>\
                     </div>'
                   ngDialog.openConfirm({ template: message, plain: 'true'});
               }
           );
        /*
        // ToDo: person is not included
        return Person
         .logout()
         .$promise
         .then(function() {
           $rootScope.currentUser = null;
         });
         */
      }

      function register(registerData) {

        var registerUrl = baseURL + "people";
        console.log("DBG: authService:logout() to url: " + registerUrl );

        $resource(registerUrl)
          .save(registerData,
             function(response) {
                login({username:registerData.username, password:registerData.password});
              if (registerData.rememberMe) {
                  $localStorage.storeObject('userinfo',
                      {username:registerData.username, password:registerData.password});
              }

                $rootScope.$broadcast('registration:Successful');
             },
             function(response){

                var message = '\
                  <div class="ngdialog-message">\
                  <div><h3>Registration Unsuccessful</h3></div>' +
                    '<div><p>' +  response.data.err.message +
                    '</p><p>' + response.data.err.name + '</p></div>';

                  ngDialog.openConfirm({ template: message, plain: 'true'});

             }

          );
        /*
        // ToDo: person is not included
        return Person
          .create({
           username: registerData.username,
           email: registerData.email,
           password: registerData.password
         })
         .$promise
        .then (function(response) {

          },
          function(response){

                var message = '\
                  <div class="ngdialog-message">\
                  <div><h3>Registration Unsuccessful</h3></div>' +
                    '<div><p>' +  response.data.error.message +
                    '</p><p>' + response.data.error.name + '</p></div>';

                  ngDialog.openConfirm({ template: message, plain: 'true'});

          });
          */
      } // register

      function getLoggedUserRoles( credentials) {
        useCredentials(credentials);

        property.query({
          id:credentials.userid,
          property:'principals'
        }).$promise.then( function (principals) {
                vm.subscriptions = principals;
        });

        return credentials;
      }

      function useCredentials(credentials) {
        isAuthenticatedFlag = true;
        authToken = credentials.token;
        username = credentials.username;
        userid = credentials.userid;

        // Set the token as header for your requests!
        $http.defaults.headers.common['x-access-token'] = authToken;
      }

      function destroyUserCredentials() {
        authToken = undefined;
        username = '';
        userid = undefined;
        isAuthenticated = false;
        $http.defaults.headers.common['x-access-token'] = authToken;
        $localStorage.remove(TOKEN_KEY);
      }

      function loadUserCredentials() {
        var credentials = $localStorage.getObject(TOKEN_KEY,'{}');
        console.log("DBG: loding user credentials");
        console.log(credentials);
        if (credentials.username != undefined) {
          useCredentials(credentials);
        }
      }

      function storeUserCredentials(credentials) {
        $localStorage.storeObject(TOKEN_KEY, credentials);
        useCredentials(credentials);
      }

    }//AuthFactory

}());
