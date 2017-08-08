(function(){
  angular
    .module('testApp')
    .controller('buyController',buyController);
    function buyController(buyService,$scope,playersService,proprietaryService){

      var vm = this;

      // Inicio de la función init que es la que se inicializa de primiera
      function init(){
        vm.buy = buyService.getBuy();
        vm.playerRel = playersService.getPlayers();
        vm.proprietaryRel = proprietaryService.getProprietary();
      }init(); // Cierre de la función init

      // Encargada de mostrar la información al usuario
      $scope.pagina = 1;
      $scope.siguiente = function() {
        $scope.pagina = 2;
      }
      $scope.anterior = function() {
        $scope.pagina = 1;
      }
      $scope.registro1 = function() {
        $scope.pagina = 1;
      }// Cierre de la encargada de mostrar la información al usuario

      // Inicio de la función save, que se encarga de obtener los datos y enviarlos para ser guardados
      vm.presave = function(){

        swal({
          title: '¿Desea comprar esta propiedad?',
          type: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#000',
          cancelButtonColor: '#000',
          confirmButtonText: 'Sí, comprar',
          cancelButtonText: 'Cancelar',
          buttonsStyling: true
        }).then(function () {
          vm.save();
          swal({
            type: 'success',
            title: '¡Compra realizada!',
            timer: 3000,
            showConfirmButton: false
          }).then(
               function () {},
               // handling the promise rejection
               function (dismiss) {
                 if (dismiss === 'timer') {
                   console.log('Venta exitosa')
                 }
               }
             )}, function (dismiss) {
          // dismiss can be 'cancel', 'overlay',
          // 'close', and 'timer'
          if (dismiss === 'cancel') {
            swal({
              type: 'error',
              title: '¡Compra no realizada!',
              text: 'La propiedad sigue en venta',
              timer: 3000,
              showConfirmButton: false
            }).then(
                 function () {},
                 // handling the promise rejection
                 function (dismiss) {
                   if (dismiss === 'timer') {
                     console.log('Venta no exitosa')
                   }
                 }
               )}
             })
           }   // cierre presave


      vm.save= function(){

        var newBuy = {
          player: vm.player,
          proprietary: vm.proprietary
        } // Cierre de newBuy

        buyService.setBuy(newBuy);
        init();
        clean();
      } // Cierre de la función save

      // Inicio: de la función getInfo, que se encarga de obtener los datos
      vm.getInfo = function(pBuy){
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
