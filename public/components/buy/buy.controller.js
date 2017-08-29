(function(){
  angular
  .module('testApp')
  .controller('buyController',buyController);
  buyController.$inject = ['buyService','$scope','playersService','proprietaryService'];

  function buyController(buyService,$scope,playersService,proprietaryService){

    var vm = this;
    vm.buy = "";
    loadBuy();

    function loadBuy(){

      buyService.getBuy().then(function (response) {
        vm.buy = response.data;
      });

      playersService.getPlayers().then(function (response) {
        vm.playerRel = response.data;
      });

      proprietaryService.getProprietary().then(function (response) {
        vm.proprietaryRel = response.data;
      });

    }

    // Encargada de mostrar la información al usuario
    $scope.page = 1;
    $scope.next = function() {
      $scope.page = 2;
    }
    $scope.back = function() {
      $scope.page = 1;
    }
    $scope.register = function() {
      $scope.page = 1;
    }// Cierre de la encargada de mostrar la información al usuario

    // Inicio de la función save, que se encarga de obtener los datos y enviarlos para ser guardados
    vm.presave = function(){
      swal({
        type: 'success',
        title: '¡Registro completado!',
        timer: 3000,
        showConfirmButton: false
      }).then(
        function () {},
        // handling the promise rejection
        function (dismiss) {
          if (dismiss === 'timer') {
            console.log('Registro exitoso')
          }
        }
      )

        }   // cierre presave

        vm.validación = function(){
          swal({
            type: 'error',
            title: 'Propiedad ya vendida!',
            timer: 3000,
            showConfirmButton: false
          }).then(
            function () {},
            // handling the promise rejection
            function (dismiss) {
              if (dismiss === 'timer') {
                console.log('Propiedad vendida')
              }
            }
          )

            }   // cierre presave


        vm.save= function(){
          var newBuy = {
            player: vm.player,
            proprietary: vm.proprietary
          } // Cierre de newBuy

          if (vm.buy.length === 0) {
            buyService.setBuy(newBuy).then(function (response) {
              vm.player = null;
              vm.proprietary = null;
              loadBuy();
            });
            clean();
            vm.presave();
            return;

          } else {
            for(var i = 0; i < vm.buy.length; i++){
              if(newBuy.proprietary === vm.buy[i].proprietary){
                vm.validación();
                return;
              } else{
                buyService.setBuy(newBuy).then(function (response) {
                  vm.proprietary = null;
                  vm.player = null;
                  loadBuy();
                });
                clean();
                vm.presave();
                return;
              }
            }
          }
          // vm.prueba();



        } // Cierre de la función save

        // vm.prueba = function(){
        //    var playerRel = playersService.getPlayers().then(function (response) {
        //    });
        //
        //
        //   playerRel.name = "Inhabilitado";
        //
        //   playersService.updatePlayers(playerRel).then(function (response) {
        //    });
        // }

        // Inicio: de la función getInfo, que se encarga de obtener los datos
        vm.getInfo = function(pBuy){
          vm.id = pBuy._id;
          vm.player = pBuy.player;
          vm.proprietary = pBuy.proprietary;
        } // Cierre de la función getInfo

        // Inicio de la función clean, que se encarga de limpiar los datos despúes de un registro
        function clean(){
          vm.player = '';
          vm.proprietary = '';

        } // Cierre de la función clean

      }// Cierre de la función buyController
    })();
