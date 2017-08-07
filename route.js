(function(){
  'use strict';
  angular
  .module('testRoutes', ['ui.router', 'oc.lazyLoad', 'angularCSS','ngMessages'])
  .config(configuration)


  configuration.$inject = ['$stateProvider', '$urlRouterProvider'];

  function configuration($stateProvider, $urlRouterProvider){
    $stateProvider

    .state('landing',{
      url : '/landing',
      templateUrl: './components/landing/landing.html',
      css:'css/style.css'
    })

    .state('players',{
      url : '/players',
      templateUrl: './components/players/players.view.html',
      resolve: {
        load: ['$ocLazyLoad', function($ocLazyLoad){
          return $ocLazyLoad.load('./components/players/players.controller.js')
        }]
      },
      controller: 'playersController',
      controllerAs: 'vm',
      css:'css/style.css'
    })

    .state('proprietary',{
      url : '/proprietary',
      templateUrl: './components/proprietary/proprietary.view.html',
      resolve: {
        load: ['$ocLazyLoad', function($ocLazyLoad){
          return $ocLazyLoad.load('./components/proprietary/proprietary.controller.js')
        }]
      },
      controller: 'proprietaryController',
      controllerAs: 'vm',
      css:'css/style.css'
    })

    .state('buy',{
      url : '/buy',
      templateUrl: './components/buy/buy.view.html',
      resolve: {
        load: ['$ocLazyLoad', function($ocLazyLoad){
          return $ocLazyLoad.load('./components/buy/buy.controller.js')
        }]
      },
      controller: 'buyController',
      controllerAs: 'vm',
      css:'css/style.css'
    })


    $urlRouterProvider.otherwise('/landing');
  }//cierre de las rutas
})();
