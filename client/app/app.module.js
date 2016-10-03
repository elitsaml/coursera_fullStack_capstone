(  function() {
  'use strict'

  angular.module( "communityGardenApp", ['communityGardenApp.core','ui.router','ngResource','ngDialog', 'wt.responsive', 'toaster', 'ui.bootstrap'])
    .constant("baseURL", "http://localhost:8080/api/")
    .config( configRoutes);

  configRoutes.$inject = ['$stateProvider', '$urlRouterProvider'];
  function configRoutes($stateProvider, $urlRouterProvider) {

      // initialize the current authenticated person


      // configure the routes
      $stateProvider
          .state('app', {
              // route for the home page

              url: '/',
              views: {
                  'header': {
                      templateUrl: 'app/modules/layout/header.html',
                      controller: 'HeaderController',
                      controllerAs: 'vm'
                  },
                  'content': {
                      templateUrl: 'app/modules/layout/home.html',
                      controller: 'HomeController',
                      controllerAs: 'vm'
                  },
                  'footer': {
                      templateUrl: 'app/modules/layout/footer.html',
                  }
              }

          })


      // route for the people page
      .state('app.people', {
        url: 'people',
        views: {
            'content@': {
              templateUrl: 'app/modules/people/people.html',
              controller: 'PeopleController',
              controllerAs: 'vm',
              resolve: {
                peopleResource: 'PeopleService',
                authService: 'AuthService',
                people: ['peopleResource', 'authService', function (peopleResource, authService) {
                            return peopleResource.query().$promise;
                        }],
              }
          }
        }
      })//state: app.people

      // route for the person profile page
      .state('app.people.currentpersonprofile', {
        url: 'currentpersonprofile',
        views: {
            'content@': {
              templateUrl: 'app/modules/people/person.html',
              controller: 'PersonController',
              controllerAs: 'vm',
              resolve: {
                peopleResource: 'PeopleService',
                authService: 'AuthService',
                person: ['peopleResource', 'authService', function (peopleResource, authService) {
                            console.log("DBG: Current person id: " +  authService.getUserId());
                            return peopleResource.get({
                                id: authService.getUserId()
                            }).$promise;
                        }]
             }
         }
       }
      })//state: app.people
      // route for the person : new or edit
      .state('app.person', {
        url: 'person/:pId',
        views: {
            'content@': {
              templateUrl: 'app/modules/people/person.html',
              controller: 'PersonController',
              controllerAs: 'vm',
              resolve: {
                peopleResource: 'PeopleService',
                person: ['peopleResource', '$stateParams',function (peopleResource, $stateParams) {
                            var personId = $stateParams.pId;
                            if (personId === undefined || personId.length <= 0) {
                                console.log("init: creating person");
                                return new peopleResource({});
                            }
                            return peopleResource.get({
                                id: personId
                            }).$promise;
                        }]
             }
         }
       }
     })//state: app.person

      // route for the plots page
      .state('app.plots', {
        url: 'plots',
        views: {
            'content@': {
              templateUrl: 'app/modules/plots/plots.html',
              controller: 'PlotController',
              controllerAs: 'vm',
              resolve: {
                plotResource: 'PlotService',
                plots: ['plotResource', function (plotResource) {
                            return plotResource.query().$promise;
                        }]
             }
         }
       }
     })//state: app.plots
      // route for the plot page : new or edit
      .state('app.plot', {
        url: 'plot/:pId',
        views: {
            'content@': {
              templateUrl: 'app/modules/plots/plot-edit.html',
              controller: 'PlotEditController',
              controllerAs: 'vm',
              resolve: {
                plotResource: 'PlotService',
                plot: ['plotResource', '$stateParams', function (plotResource, $stateParams) {
                            var plotId = $stateParams.pId;
                            if (plotId === undefined || plotId.length <= 0) {
                                console.log("init: creating new plot");
                                return new plotResource({});
                            }
                            return plotResource.get({
                                id: plotId
                            }).$promise;
                        }]
             }
         }
       }
     })//state: app.plot


      // route for the plots page
      .state('app.messages', {
        url: 'messages',
        views: {
            'content@': {
              templateUrl: 'app/modules/messages/messages.html',
              controller: 'MessageController',
              controllerAs: 'vm',
              resolve: {
                messageResource: 'MessageService',
                messages: ['messageResource', function (messageResource) {
                            return messageResource.query().$promise;
                        }]
             }
         }
       }
      })//state: app.plots

     // route for the subscriptions page
     .state('app.subscriptions', {
       url: 'subscriptions',
       views: {
           'content@': {
             templateUrl: 'app/modules/subscriptions/subscriptions.html',
             controller: 'SubscriptionController',
             controllerAs: 'vm',
             resolve: {
               subscriptionResource: 'SubscriptionService',
               subscriptions: ['subscriptionResource', function (subscriptionResource) {
                           return subscriptionResource.query().$promise;
                       }]
            }
        }
      }
    })//state: app.subscriptionsResource
    // route for the subscription page : new or edit
    .state('app.subscription', {
      url: 'subscriptions/:sId',
      views: {
          'content@': {
            templateUrl: 'app/modules/subscriptions/subscription-edit.html',
            controller: 'SubscriptionEditController',
            controllerAs: 'vm',
            resolve: {
              subscriptionResource: 'SubscriptionService',
              subscription: ['subscriptionResource', '$stateParams', function (subscriptionResource, $stateParams) {
                          var subId = $stateParams.sId;
                          if (subId === undefined || subId.length <= 0) {
                              console.log("init: creating new subscription");
                              return new subscriptionResource({});
                          }
                          return subscriptionResource.get({
                              id: subId
                          }).$promise;
                      }]
           }
       }
     }
    })//state: app.plot
    // current person subscriptions
    .state('app.people.currentpersonsubscription', {
      url: 'currentpersonsubscription',
      views: {
          'content@': {
            templateUrl: 'app/modules/subscriptions/currentpersonsubscription.html',
            controller: 'SubscriptionController',
            controllerAs: 'vm',
            resolve: {
              peopleService: 'PeopleService',
              authService: 'AuthService',
              subscriptions: ['peopleService', 'authService', function (peopleService, authService) {
                          console.log("DBG: Current person id: " +  authService.getUserId());
                          return peopleService.query({
                              id: authService.getUserId(),
                              resource: 'subscriptions'
                          }).$promise;
                      }]
           }
       }
     }
    })//state: app.people
  // current person subscriptions
  .state('app.people.subscription', {
    url: 'subscription/:sId',
    views: {
        'content@': {
          templateUrl: 'app/modules/subscriptions/currentpersonsubscriptionEdit.html',
          controller: 'SubscriptionEditController',
          controllerAs: 'vm',
          resolve: {
            subscriptionService: 'SubscriptionService',
            authService: 'AuthService',
            subscription: ['subscriptionService', 'authService','$stateParams', function (subscriptionService, authService, $stateParams) {
                        console.log("DBG: Current person id: " +  authService.getUserId());
                        var subId = $stateParams.sId;
                        if (subId === undefined || subId.length <= 0) {
                            console.log("init: creating new subscription");
                            return new subscriptionService({   });
                        }
                        return subscriptionService.get({
                            id: subId
                        }).$promise;
                    }]
         }
     }
   }
  })//state: app.people

  /*
  .state('app.people.subscription', {
    url: 'subscription/:sId',
    views: {
        'content@': {
          templateUrl: 'app/modules/subscriptions/currentpersonsubscriptionEdit.html',
          controller: 'SubscriptionEditController',
          controllerAs: 'vm',
          resolve: {
            peopleService: 'PeopleService',
            authService: 'AuthService',
            subscription: ['peopleService', 'authService','$stateParams', function (peopleService, authService, $stateParams) {
                        console.log("DBG: Current person id: " +  authService.getUserId());
                        var subId = $stateParams.sId;
                        if (subId === undefined || subId.length <= 0) {
                            console.log("init: creating new subscription");
                            return new peopleService({
                              id: authService.getUserId(),
                              resource: 'subscriptions'
                            });
                        }
                        return peopleService.get({
                            id: authService.getUserId(),
                            resource: 'subscriptions',
                            fk: subId
                        }).$promise;
                    }]
         }
     }
   }
  })//state: app.people
  */


      // route for the aboutus page
      .state('app.organization', {
          url: 'organization',
          views: {
              'content@': {
                  templateUrl: 'app/views.static/organization.html'
              }
          }
      })

      // route for the contactus page
      .state('app.contactus', {
          url: 'contactus',
          views: {
              'content@': {
                  templateUrl: 'views/contactus.html',
                  controller: 'ContactController'
              }
          }
      })

      // route for the menu page
      .state('app.menu', {
          url: 'menu',
          views: {
              'content@': {
                  templateUrl: 'views/menu.html',
                  controller: 'MenuController'
              }
          }
      })

      // route for the dishdetail page
      .state('app.dishdetails', {
          url: 'menu/:id',
          views: {
              'content@': {
                  templateUrl: 'views/dishdetail.html',
                  controller: 'DishDetailController'
              }
          }
      });

      $urlRouterProvider.otherwise('/');
  }
} )();
